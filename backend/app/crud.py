from sqlalchemy.orm import Session
from app.models import URL
from app.utils import generate_short_code


from fastapi import HTTPException

from datetime import datetime, timedelta
from fastapi import HTTPException

def create_short_url(db: Session, original_url: str, custom_alias: str | None = None, expiry_days: int | None = None):
    existing_url = db.query(URL).filter(URL.original_url == original_url).first()

    if existing_url and custom_alias is None:
        return existing_url

    if custom_alias:
        alias_exists = db.query(URL).filter(URL.short_code == custom_alias).first()
        if alias_exists:
            raise HTTPException(status_code=400, detail="Custom alias already taken")
        short_code = custom_alias
    else:
        short_code = generate_short_code()

    expires_at = None
    if expiry_days:
        expires_at = datetime.utcnow() + timedelta(days=expiry_days)

    db_url = URL(
        original_url=original_url,
        short_code=short_code,
        expires_at=expires_at
    )

    db.add(db_url)
    db.commit()
    db.refresh(db_url)

    return db_url
def get_url_by_code(db: Session, short_code: str):
    return db.query(URL).filter(URL.short_code == short_code).first()


def increment_clicks(db: Session, db_url: URL):
    db_url.clicks += 1
    db.commit()
    db.refresh(db_url)
    return db_url