import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, Date, Enum
from sqlalchemy.orm import relationship
from src.database import Base
from src.schemas.event import EventType


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, index=True)
    company = Column(String, index=True)
    url = Column(String, index=True)
    notes = Column(String, index=True)

    events = relationship("Event")


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True, default=datetime.date.today())
    notes = Column(String, index=True)
    type = Column(Enum(EventType), index=True)

    job_id = Column(Integer, ForeignKey("jobs.id"))

