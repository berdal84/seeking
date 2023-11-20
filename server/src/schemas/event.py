import datetime
from dataclasses import dataclass
from typing import Optional
from pydantic import BaseModel, ConfigDict
from enum import Enum


class EventType(str, Enum):
    UNKNOWN = "UNKNOWN",
    APPLICATION_SENT = "APPLICATION_SENT",
    MAIL_EXCHANGE = "MAIL_EXCHANGE",
    PHONE_CALL = "PHONE_CALL",
    ONLINE_TEST = "ONLINE_TEST",
    ONLINE_INTERVIEW = "ONLINE_INTERVIEW",
    ONSITE_TEST = "ONSITE_TEST",
    ONSITE_INTERVIEW = "ONSITE_INTERVIEW",
    OFFER_PROPOSED = "OFFER_PROPOSED",
    OFFER_ACCEPTED = "OFFER_ACCEPTED",
    OFFER_REJECTED = "OFFER_REJECTED",
    STOPPED_BY_CANDIDATE = "STOPPED_BY_CANDIDATE",
    STOPPED_BY_RECRUITER = "STOPPED_BY_RECRUITER",


class EventCreate(BaseModel):
    type: EventType
    notes: str


class Event(BaseModel):
    id: int
    type: EventType
    date: datetime.date
    notes: str

    class Config:
        use_enum_values = True
