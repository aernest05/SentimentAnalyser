import httpx
import pandas as pd

def google_search_api(company_query,description_query):
    api_key = "AIzaSyAlOFocUp4McLsZ3pYXDBsCwFG6bc0Acec"
    search_engine_id = "058da253c8eaa43e6"
    search_query = company_query + ' ' + description_query

    base_url = "https://customsearch.googleapis.com/customsearch/v1"
    params = {
        'key': api_key,
        'cx': search_engine_id,
        'q': search_query,
    }  

    response = httpx.get(base_url,params=params)
    response.raise_for_status()

    api_response = response.json()

    results = []


    for i, item in enumerate(api_response['items']):
        try:
            title = item.get('title', f'No title {i+1}')
            link = item.get('link', f'No link {i+1}')
            snippet = item.get('snippet', '')  # Optional: include snippet
            
            results.append({
                'company_query': company_query,
                'description_query': description_query,
                'title': title,
                'link': link,
                'snippet': snippet
            })
        except Exception as e:
            print(f"Error processing item {i}: {e}")
            continue

    return pd.DataFrame(results)
    

def check_company_from_google_search(description_queries:list[str],company_query: str) -> pd.DataFrame:
    
    # Search for each query and collect DataFrames
    dfs = []
    for description_query in description_queries:
        df = google_search_api(company_query,description_query)
        dfs.append(df)
    
    # Concatenate all results into one DataFrame
    final_df = pd.concat(dfs, ignore_index=True)
    return final_df


     
    
