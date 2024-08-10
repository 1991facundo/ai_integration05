from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv


load_dotenv()


openai.api_key = os.getenv("OPENAI_API_KEY")


app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/autocomplete/")
async def autocomplete(query: str):
    response = await get_magic_card_suggestions(query)
    return {"query": query, "suggestions": response}

async def get_magic_card_suggestions(query: str) -> list:
    prompt = f"Sugerir al menos dos nombres de cartas de Magic: The Gathering que comiencen con '{query}':"
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Eres un asistente experto en Magic: The Gathering y debes sugerir nombres de cartas de Magic."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.9,
        )
        
        
        print(f"Prompt sent: {prompt}")
        
    
        print(f"Full response: {response}")
        
       
        suggestions_text = response['choices'][0]['message']['content'].strip()
        suggestions = suggestions_text.split('\n')
        
       
        print(f"Suggestions extracted: {suggestions}")
        
        return suggestions
    except Exception as e:
        print(f"Error al contactar la API de OpenAI: {e}")
        return []

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")