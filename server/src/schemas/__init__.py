from .event import Event, EventCreate, EventType, EventUpdate
from .job import Job, JobCreate
from .page import Page

JobPage = Page[Job]
