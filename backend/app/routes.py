from fastapi import APIRouter
from app.utils import get_word_data  # Ensure utils.py is correctly imported

router = APIRouter()

@router.get("/word/{word}")
def fetch_word(word: str):
    return get_word_data(word)
