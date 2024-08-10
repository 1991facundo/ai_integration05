from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Autocomplete API"}

@app.get("/autocomplete/")
def autocomplete(query: str):
    suggestions = ["example1", "example2", "example3"]
    return {"query": query, "suggestions": suggestions}