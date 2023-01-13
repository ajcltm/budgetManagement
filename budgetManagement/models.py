import Isql
from pathlib import Path
from datetime import date, datetime
from typing import Optional
import uuid
from pydantic import validator

db_path = Path.home().joinpath('Desktop', 'bgm.db')
protocol = f'sqlite://database?{db_path}'
engine = Isql.create_engine(protocol=protocol)
_sql = engine.get_sql()

class Rqm(_sql):
    rqmId: Optional[str]
    rqmDate: Optional[datetime]
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

if __name__ == '__main__':
    r = Rqm(rqmDate=date(2023,1,13), acc='dongi', payDate=date(2022,12,31), dsc="wash", amt=30_000)
    print(r)

