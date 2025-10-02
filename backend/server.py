from flask import Flask, jsonify,request
import sentiment_analyser
from datetime import datetime,timedelta
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

cache = {}
CACHE_DURATION_HOURS = 24  

def get_cached_analysis(company_name):
    """Get from cache if valid"""
    if company_name in cache:
        data, timestamp = cache[company_name]
        # Check if cache is still valid
        if datetime.now() - timestamp < timedelta(hours=CACHE_DURATION_HOURS):
            return data
    return None

def set_cache(company_name, data):
    """Store in cache with timestamp"""
    cache[company_name] = (data, datetime.now())
    
@app.route('/')
def home():
    return jsonify({"status": "Backend is running!", "message": "Test successful"})

@app.route("/api", methods = ['GET'])
def return_analyse_company():
    company = request.args.get('company')
    result = sentiment_analyser.get_company_from_supabase(company)
    return jsonify(result)

@app.route("/api/search", methods = ['GET'])
def search_query_result():
    query = request.args.get('search_query')
    query = '' if not query else query
    query_result = sentiment_analyser.search_supabase(query)
    return jsonify(query_result)

@app.route("/api/new_entry", methods = ['GET'])
def new_entry():
    search_params = request.args.get('search_params')
    query_result = sentiment_analyser.create_new_supabase_entry(search_params) #type:ignore
    return jsonify(query_result)
@app.route("/api/usage", methods = ['GET'])
def api_usage():
    api_count = sentiment_analyser.count_api_usage()
    return jsonify(api_count)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)  # NOT 127.0.0.1

