from fastapi import FastAPI
from app.database import engine, Base
from app.models import URL
from app.routes import url_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="URL Shortener API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://127.0.0.1:8088",
    "http://localhost:8088",
    "https://url-shortener-tan-zeta.vercel.app/"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "URL Shortener API is healthy"
    }
app.include_router(url_routes.router)

@app.get("/")
def home():
    return {"message": "URL Shortener API is running"}
