from datetime import date, datetime
from typing import Optional
import uuid
from pydantic import validator

from budgetManagement import utils


class Rqm(utils.sql):
    rqmId: Optional[str]
    rqmDate: Optional[datetime]
    forMonth: date
    acc: str
    payDate: date
    dsc: str
    amt: int
    pybDate: Optional[date]

    @validator('rqmId', pre=True, always=True)
    def create_rqmId(cls, v):
        time_id = datetime.now().strftime(format='%y%m%d%H%M%S')
        raw_id = str(uuid.uuid1().int)
        return f'{time_id}-{raw_id[:4]}-{raw_id[4:8]}'

    @validator('rqmDate', pre=True, always=True)
    def create_rqmDate(cls, v):
        return datetime.strptime(datetime.now().strftime(format='%Y-%m-%d-%H-%M-%S'), '%Y-%m-%d-%H-%M-%S')

class Budget(utils.sql):
    bgId: Optional[str]
    dpsDate: date
    forMonth: date
    acc: str
    amt: int

    @validator('bgId', pre=True, always=True)
    def create_bgId(cls, v):
        time_id = datetime.now().strftime(format='%y%m%d%H%M%S')
        raw_id = str(uuid.uuid1().int)
        return f'{time_id}-{raw_id[:4]}-{raw_id[4:8]}'
