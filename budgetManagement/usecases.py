from budgetManagement import models, utils
import Isql

db = Isql.DBM(utils.connector)

# ======= Requirement ======== 

def require_pay_back(forMonth, acc, payDate, dsc, amt):
    data = models.Rqm(forMonth=forMonth, acc=acc, payDate=payDate, dsc=dsc, amt=amt)
    db.create_table(model=models.Rqm)
    db.insert_data(data=data)

def change_requirement(id, **ags):
    db.update_data(model=models.Rqm,**ags).where(rqmId=id)
    
def delete_requirement(id):
    db.delete_data(model=models.Rqm, rqmId=id)

# ======= Budget ======== 

def deposit_budget(forMonth, dpsDate, acc, amt):
    data = models.Budget(forMonth=forMonth, dpsDate=dpsDate, acc=acc, amt=amt)
    db.create_table(model=models.Budget)
    db.insert_data(data=data)

def change_budget(id, **ags):
    db.update_data(model=models.Budget,**ags).where(bgId=id)
    
def delete_budget(id):
    db.delete_data(model=models.Budget, bgId=id)