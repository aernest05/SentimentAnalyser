import pandas as pd
from dotenv import load_dotenv
import os
from supabase import create_client
from openai import OpenAI
import datetime as dt
from google_search_api import check_company_from_google_search

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
description_queries = [
        "scandal controversy",
        "financial performance", 
        "lawsuits legal",
    ]

def create_new_supabase_entry(company_name:str) -> list[dict] | None:
    try:
        df = check_company_from_google_search(description_queries,company_name)

        api_key = os.environ.get("DEEPSEEK_API")
        prompt_list = 'title: ' + df['title'] + ' | snippet: ' + df['snippet']

        prompt = " || ".join(prompt_list)

        client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system", 
                    "content": """
                    You will be given a list of company news titles separated by the " || " symbol.
                    Analyze the sentiment of each title individually.
                    For each title, provide:
                    1. Sentiment (ONLY use: 'positive', 'negative', or 'neutral')
                    2. A brief reasoning (1 short sentence explaining why)
                    
                    Format your response as a CSV with exactly this header: sentiment,reasoning
                    Then provide one line per title with the sentiment and reasoning separated by commas.
                    
                    Example:
                    sentiment,reasoning
                    negative,The title mentions scandal and financial losses
                    neutral,Factual reporting about stock movements without emotional language
                    positive,Highlights company growth and positive achievements
                    """
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            stream=False
        )

        response_result = response.choices[0].message.content
        results = []

        lines = response_result.strip().split('\n')[1:] # type:ignore

        for line in lines:
            if line.strip():  # Skip empty lines
                parts = line.split(',', 1)  # Split only on first comma
                if len(parts) == 2:
                    sentiment, reasoning = parts
                    results.append({
                        'sentiment': sentiment.strip(),
                        'reasoning': reasoning.strip()
                    })

        # Create DataFrame
        sentiment_df = pd.DataFrame(results)
        final_df = pd.concat([df, sentiment_df], axis=1)

        final_df['created_at'] = dt.datetime.now().isoformat()
        final_df = final_df.drop_duplicates('link')
        records = final_df.to_dict('records')

        response = supabase.table('articles').upsert(
                records, 
                on_conflict='link'  # Use link as unique identifier
            ).execute()
        return final_df.to_dict('records')
    
    except Exception as e:
        print(f"Error analyzing company: {e}")
        return None
    
def get_company_from_supabase(company_name):
    database_query = (company_name).lower()
    response = (supabase.table('articles')
                .select()
                .ilike('company_query',database_query)
                .execute())
    return response.data

def search_supabase(query):
    database_query = (f'%{query}%').lower()
    response = (supabase.table('articles')
                .select('created_at,company_query')
                .ilike('company_query',database_query)
                .execute())
    df = pd.DataFrame(response.data)
    search_result_df = df.groupby('created_at').first().reset_index()
    return search_result_df.to_dict('records')

def count_api_usage()->int:
    today = dt.datetime.now().strftime('%Y-%m-%d') 
    response = (
        supabase.table('articles')
        .select('created_at')
        .gte('created_at',f"{today}T00:00:00") 
        .lte('created_at',f"{today}T23:59:59")  
        .execute()
    )

    df = pd.DataFrame(response.data)
    search_count = len(df['created_at'].unique())
    return search_count*len(description_queries) #total search len









