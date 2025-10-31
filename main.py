from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_KEY")

@app.get("/")
def read_root():
    return {"Message": "Welcome to the Soccer API!"}

@app.get("/leagues")
def get_leagues():
    url = "https://v3.football.api-sports.io/leagues"

    headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        leagues = [
            {
                "name": league["league"]["name"],
                "country": league["country"]["name"]
            }
            for league in data.get("response", [])
        ]
        return {
            "league_count": len(leagues),
            "leagues": leagues
        }
    else:
        return {"error": f"Error {response.status_code}", "detail": response.text}

@app.get("/basketball-leagues")
def get_basketball_leagues():
    url = "https://v1.basketball.api-sports.io/leagues"
    headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v1.basketball.api-sports.io'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        leagues = [
            {
                "name": league["name"],
                "type": league["type"],
                "country": league["country"]["name"] if league.get("country") else "Unknown"
            }
            for league in data.get("response", [])
        ]
        return {
            "sport": "basketball",
            "league_count": len(leagues),
            "leagues": leagues
        }
    else:
        return {"error": f"Error {response.status_code}", "detail": response.text}