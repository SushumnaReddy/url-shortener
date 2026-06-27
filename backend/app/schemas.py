from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime


class URLCreate(BaseModel):
    original_url: HttpUrl
    custom_alias: Optional[str] = None
    expiry_days: Optional[int] = None


class URLResponse(BaseModel):
    short_code: str
    original_url: str


class URLStats(BaseModel):
    short_code: str
    original_url: str
    clicks: int
    expires_at: Optional[datetime] = None