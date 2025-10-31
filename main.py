from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

API_FOOTBALL_KEY = os.getenv("API_FOOTBALL_KEY")

@app.get("/")
def read_root():
    return {"Message": "Welcome to the Soccer API!"}

@app.get("/leagues")
def get_leagues():
    url = "https://v3.football.api-sports.io/leagues"

    headers = {
        'x-rapidapi-key': API_FOOTBALL_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
    }

    response = requests.request("GET", url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return {
            "cantidad_ligas": len(data.get("response", [])),
            "ligas": [
                {
                    "nombre": league["league"]["name"],
                    "país": league["country"]["name"]
                }
                for league in data.get("response", [])
            ]
        }
    else:
        return {"error": f"Error {response.status_code}", "detalle": response.text}
