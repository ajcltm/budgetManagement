from budgetManagement import models
from pathlib import Path
import Isql

db_path = Path.home().joinpath('Desktop', 'bgm.db')
protocol = f'sqlite://database?{db_path}'
engine = Isql.create_engine(protocol=protocol)
con = engine.get_connector()
db = Isql.DBM(con)

def insert_rqm(**ags):
    data = models.Rqm(**ags)
    db.create_table(model=models.Rqm)
    db.insert_data(data=data)

def update_rqm(id, **ags):
    db.create_table(models.Rqm)
    db.update_data(model=models.Rqm,**ags).where(rqmId=id)
