from flask import Flask, jsonify, request
from flask_cors import CORS
import fastf1
import pandas as pd
import requests
from xml.etree import ElementTree as ET

app = Flask(__name__)
CORS(app)

# Function to fetch schedule data from FastF1 API
def get_schedule(year):
    schedule = fastf1.get_event_schedule(year)
    schedule_list = schedule.to_dict(orient='records')

    # Convert special types like NaT manually
    for record in schedule_list:
        for key, value in record.items():
            if pd.isna(value):
                record[key] = None
            elif isinstance(value, pd.Timestamp):
                record[key] = value.isoformat()

    return schedule_list

# Function to fetch results data from Ergast API
def get_race_results():
    response = requests.get('https://ergast.com/api/f1/current/last/results.json')
    if response.status_code == 200:
        try:
            race_results = response.json()['MRData']['RaceTable']['Races'][0]['Results']
            return race_results
        except Exception as e:
            print("Error decoding JSON:", e)
            return None
    else:
        print("Request failed with status code:", response.status_code)
        return None

# Function to fetch news data from the Formula 1 RSS feed
def get_f1_news():
    try:
        response = requests.get('https://www.autosport.com/rss/f1/news/')
        if response.status_code == 200:
            root = ET.fromstring(response.content)
            news_list = []
            for item in root.findall('.//item'):
                news_item = {}
                title_elem = item.find('title')
                link_elem = item.find('link')
                pubDate_elem = item.find('pubDate')
                description_elem = item.find('description')
                enclosure_elem = item.find('enclosure')
                
                if title_elem is not None:
                    news_item['title'] = title_elem.text
                if link_elem is not None:
                    news_item['link'] = link_elem.text
                if pubDate_elem is not None:
                    news_item['pubDate'] = pubDate_elem.text
                if description_elem is not None:
                    news_item['description'] = description_elem.text
                if enclosure_elem is not None:
                    news_item['image_url'] = enclosure_elem.get('url')
                
                news_list.append(news_item)
            return news_list
        else:
            print("Request failed with status code:", response.status_code)
            return None
    except Exception as e:
        print("Error fetching or parsing RSS feed:", e)
        return None

def is_allowed_origin(origin):
    allowed_origins = ['https://f1dash.net', 'https://www.f1dash.net']
    return origin in allowed_origins

@app.route('/api/f1/schedule', methods=['GET'])
def schedule():
    year = request.args.get('year', 2024, type=int)  # Default year is 2024
    schedule_data = get_schedule(year)
    response = jsonify(schedule_data)
    
    origin = request.headers.get('Origin')
    if is_allowed_origin(origin):
        response.headers.add('Access-Control-Allow-Origin', origin)

    return response

@app.route('/api/f1/results', methods=['GET'])
def results():
    race_results = get_race_results()
    response = jsonify(race_results)
    
    origin = request.headers.get('Origin')
    if is_allowed_origin(origin):
        response.headers.add('Access-Control-Allow-Origin', origin)

    return response

@app.route('/api/f1/news', methods=['GET'])
def news():
    f1_news = get_f1_news()
    response = jsonify(f1_news)
    
    origin = request.headers.get('Origin')
    if is_allowed_origin(origin):
        response.headers.add('Access-Control-Allow-Origin', origin)

    return response


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
