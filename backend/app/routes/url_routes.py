from datetime import datetime
from io import BytesIO

import qrcode
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse, StreamingResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import URLCreate, URLResponse, URLStats
from app.crud import (
    create_short_url,
    get_url_by_code,
    increment_clicks,
)

router = APIRouter()


@router.post("/api/shorten", response_model=URLResponse)
def shorten_url(url_data: URLCreate, db: Session = Depends(get_db)):
    new_url = create_short_url(
        db,
        str(url_data.original_url),
        url_data.custom_alias,
        url_data.expiry_days,
    )

    return URLResponse(
        short_code=new_url.short_code,
        original_url=new_url.original_url,
    )


@router.get("/api/stats/{short_code}", response_model=URLStats)
def get_stats(short_code: str, db: Session = Depends(get_db)):
    db_url = get_url_by_code(db, short_code)

    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")

    return URLStats(
    short_code=db_url.short_code,
    original_url=db_url.original_url,
    clicks=db_url.clicks,
    expires_at=db_url.expires_at,
)


@router.get("/api/qr/{short_code}")
def generate_qr(short_code: str, db: Session = Depends(get_db)):
    db_url = get_url_by_code(db, short_code)

    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")

    # Change this to your deployed domain after deployment
    short_url = f"http://127.0.0.1:8000/{short_code}"

    qr = qrcode.make(short_url)

    img = BytesIO()
    qr.save(img, "PNG")
    img.seek(0)

    return StreamingResponse(img, media_type="image/png")


@router.get("/{short_code}")
def redirect_url(short_code: str, db: Session = Depends(get_db)):
    db_url = get_url_by_code(db, short_code)

    if db_url is None:
        raise HTTPException(status_code=404, detail="Short URL not found")

    if (
        db_url.expires_at is not None
        and db_url.expires_at < datetime.utcnow()
    ):
        raise HTTPException(
            status_code=410,
            detail="This short URL has expired",
        )

    increment_clicks(db, db_url)

    return RedirectResponse(url=str(db_url.original_url))