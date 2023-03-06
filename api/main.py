from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from budgetManagement import usecases
from fastapi.encoders import jsonable_encoder
from datetime import date
from typing import Optional


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginInfo(BaseModel):
    userId: str
    userPw: str

class AddRqm(BaseModel):
    forRqer:str
    forMonth:date
    acc:str
    payDate:date
    dsc:str
    amt:int

class UpdateRqm(BaseModel):
    rqmId:str
    rqmDate:str
    forRqer:str
    forMonth:date
    acc:str
    payDate:date
    dsc:str
    amt:int
    pybDate:Optional[date]

    @validator('amt', pre=True, always=True)
    def to_number(cls, v):
        if type(v) == str:
            return int(v.replace(',','')) 
        return v
    
    
class DeleteRqm(BaseModel):
    rqmId: str


class AddBgd(BaseModel):
    dpser:str
    dpsDate:date
    forMonth:date
    acc:str
    amt:int

class UpdateBgd(BaseModel):
    bgId:str
    dpser:str
    dpsDate:date
    forMonth:date
    acc:str
    amt:int

class DeleteBgId(BaseModel):
    bgId: str

@app.get("/")
async def root():
    print('working')
    return {"result":"성공"}

@app.get("/rqm")
async def rqm():
    data = usecases.query_requirement()
    return data

@app.post("/rqmAdd")
async def rqmAdd(data:AddRqm):
    usecases.register_requirement(**data.dict())
    print("신규등록 완료")
    print(data)
    return {"message": "청구내역이 등록되었습니다."}

@app.post("/rqmUpdate")
async def rqmUpdate(data:UpdateRqm):
    usecases.change_requirement(id=data.rqmId, **data.dict(exclude={'rqmId', 'rqmDate'}))
    print("수정 완료")
    print(data)
    return {"message": "청구내역이 수정되었습니다."}

@app.post("/rqmDelete")
async def rqmDelete(data:DeleteRqm):
    usecases.delete_requirement(id=data.rqmId)
    print("삭제 완료")
    print(data)
    return {"message": "청구내역이 삭제되었습니다."}

@app.get("/bgd")
async def bgd():
    data = usecases.query_budget()
    return data
    
@app.post("/bgdAdd")
async def bgdAdd(data:AddBgd):
    usecases.register_budget(**data.dict())
    print("신규등록 완료")
    print(data)
    return {"message": "입금내역이 등록되었습니다."}

@app.post("/bgdUpdate")
async def bgdUpdate(data:UpdateBgd):
    usecases.change_budget(id=data.bgId, **data.dict(exclude={'bgId'}))
    print("수정 완료")
    print(data)
    return {"message": "입금내역이 수정되었습니다."}

@app.post("/bgdDelete")
async def bgdDelete(data:DeleteBgId):
    usecases.delete_budget(id=data.bgId)
    print("삭제 완료")
    print(data)
    return {"message": "청구내역이 삭제되었습니다."}


@app.get("/bgs")
async def bgState():
    data = usecases.query_monthly_account_budget()
    print(data)
    return data