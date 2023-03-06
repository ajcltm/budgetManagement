from budgetManagement import models, utils
import Isql
from datetime import datetime, date

db = Isql.DBM(utils.connector)

# ======= Requirement ======== 

def register_requirement(forRqer, forMonth, acc, payDate, dsc, amt):
    data = models.Rqm(forRqer=forRqer, forMonth=forMonth, acc=acc, payDate=payDate, dsc=dsc, amt=amt)
    db.create_table(model=models.Rqm)
    db.insert_data(data=data)

def change_requirement(id, **ags):
    db.update_data(model=models.Rqm,**ags).where(rqmId=id)
    
def delete_requirement(id):
    db.delete_data(model=models.Rqm, rqmId=id)

def query_requirement(**condition):
    if condition:
        return db.query(tableName='Rqm').select().where(**condition).export_data(format='dict')
    return db.query(tableName='Rqm').select().export_data(format='dict')

# ======= Budget ======== 

def register_budget(dpser, forMonth, dpsDate, acc, amt):
    data = models.Budget(dpser=dpser, forMonth=forMonth, dpsDate=dpsDate, acc=acc, amt=amt)
    db.create_table(model=models.Budget)
    db.insert_data(data=data)

def change_budget(id, **ags):
    db.update_data(model=models.Budget,**ags).where(bgId=id)
    
def delete_budget(id):
    db.delete_data(model=models.Budget, bgId=id)

def query_budget(**condition):
    if condition:
        return db.query(tableName='Budget').select().where(**condition).export_data(format='dict')
    return db.query(tableName='Budget').select().export_data(format='dict')

# ======== report ==========

def query_monthly_account_budget():
    grouped_rqm = db.query('Rqm').select('forMonth', 'acc').group_by('forMonth', 'acc').sum('amt', 'amt')
    grouped_bgd = db.query('Budget').select('forMonth', 'acc').group_by('forMonth', 'acc').sum('amt', 'amt')
    joined = db.query('Rqm').set_table('gr', subQuery=grouped_rqm).set_table('gb', subQuery=grouped_bgd).select('gr.forMonth', 'gr.acc', 'gb.amt as bgd_amt', 'gr.amt as rqm_amt').from_('gr').join(tableName='gb', how='left outer', gr_forMonth='=gb.forMonth' , gr_acc='=gb.acc').export_data(format='dict')
    return joined
    
