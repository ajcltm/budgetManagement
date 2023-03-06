import React, { useState } from "react";
import {useQuery} from "react-query"
import axios from "axios"
import { Table, Td } from "../components/styles/StyledTable.styled";
import { Button } from "../components/styles/StyledButton.styled";
import { ScreenContainer, TopicBody, TopicContainer, TopicHeader } from "../components/styles/StyleContainer.styled";

const fetchRqm = () => {
    return axios.get("http://127.0.0.1:8000/rqm")
}

const headerKeys = ['청구번호', '청구일자', '청구인', '귀속월', '계정', '지출일자', '세부내역', '금액', '입금일자', '편집']
const addHeaderKeys = ['청구인', '귀속월', '계정', '지출일자', '세부내역', '금액', '버튼']
const inputType = { rqmId:'text',
                    rqmDate:'text',
                    forRqer:"text",
                    forMonth:"date",
                    acc: "text",
                    payDate: "date",
                    dsc: "text",
                    amt: "text",
                    pybDate:"date"
                }
const tableDataWidth = { rqmId:'200px',
                    rqmDate:'170px',
                    forRqer:"70px",
                    forMonth:"150px",
                    acc: "70px",
                    payDate: "150px",
                    dsc: "260px",
                    amt: "80px",
                    pybDate:"150px"
                }

export default function Rqm() {

    const [addFormData, setAddFormData] = useState({
        forRqm:"",
        forMonth:"",
        acc: "",
        payDate: "",
        dsc: "",
        amt: ""
    })
    const [editRqmId, setEditRqmId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        rqmId:"",
        rqmDate:"",
        forRqer:"",
        forMonth:"",
        acc: "",
        payDate: "",
        dsc: "",
        amt: "",
        pybDate:""
    })

    const [refetchingTogle, setRefetchingTogle] = useState(false)

    const {isLoading, data, isError, error} = useQuery([refetchingTogle], fetchRqm,)

    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        console.log(event.target.value)
        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue
        setAddFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/rqmAdd", addFormData)
        setAddFormData({
            forRqm:"",
            forMonth:"",
            acc: "",
            payDate: "",
            dsc: "",
            amt: ""
        })
        setRefetchingTogle(!refetchingTogle)
    }

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditRqmId(item.rqmId)
        const formValue = {
            rqmId : item.rqmId,
            rqmDate: item.rqmDate,
            forRqer : item.forRqer,
            forMonth : item.forMonth,
            acc: item.acc,
            payDate: item.payDate,
            dsc: item.dsc,
            amt: item.amt,
            pybDate : item.pybDate
        }
        setEditFormData(formValue)
    }

    const handleDeleteClick = (event, rqmId) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/rqmDelete", {'rqmId':rqmId})
        setRefetchingTogle(!refetchingTogle)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('name'))
        const fieldName = event.target.getAttribute('name') 
        console.log(event.target.value)
        const fieldValue = event.target.value
        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue
        setEditFormData(newFormData)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        console.log(editFormData)
        axios.post("http://127.0.0.1:8000/rqmUpdate", editFormData)
        setEditRqmId(null)
        setRefetchingTogle(!refetchingTogle)
    }

    const formatCurrency = (value) => {
        if (typeof value ==='number') {
            return value.toLocaleString()
        } else {
            return value;
        }
    }

    if (isLoading) {
        return <div> now is loading... </div>
    }

    return (
        <ScreenContainer>
            <TopicContainer>
                <TopicHeader>
                    <span>청구 내역</span>
                </TopicHeader>
                <TopicBody>
                    <form onSubmit={handleEditFormSubmit}>
                        <Table>
                            <thead>
                                <tr>
                                    {headerKeys.map(key => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.data.map((item, ix) => 
                                    <tr key={ix}>
                                        {Object.entries(item).map(([k, v]) => ((
                                            <Td width={tableDataWidth[k]} number={typeof v==='number'} editmode={editRqmId===item.rqmId}>
                                            {editRqmId===item.rqmId?(
                                                <input type = {inputType[k]} name={k} value={formatCurrency(editFormData[k])} onChange={handleEditFormChange}/>
                                            ):(
                                                formatCurrency(v)
                                            )
                                            }
                                            </Td>
                                        )))}
                                            {editRqmId===item.rqmId?(
                                                <Td editmode={editRqmId===item.rqmId} key={ix}>
                                                    <Button type="submit">저장</Button>
                                                </Td>
                                            ):(
                                                <>
                                                    <Td key={ix}>
                                                        <Button editmode={editRqmId===item.rqmId} type="button" onClick={(event)=> handleEditClick(event, item)}>수정</Button>
                                                        <Button editmode={editRqmId===item.rqmId} type="button" onClick={(event)=> handleDeleteClick(event, item.rqmId)}>삭제</Button>
                                                    </Td>
                                                </>
                                            )}
                                    </tr>
                                    )}
                            </tbody>
                        </Table>
                    </form>
                </TopicBody>
            </TopicContainer>

            <TopicContainer>
                <TopicHeader>
                    <span>청구하기</span>
                </TopicHeader>
                <TopicBody>
                    <form onSubmit={handleAddFormSubmit}>
                        <Table>
                            <thead>
                                <tr>
                                    {addHeaderKeys.map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <Td editmode={true}>
                                        <input type="text" name="forRqer" required="required" placeholder="청구인을 입력해주세요." value={addFormData.forRqer} size='18' onChange={handleAddFormChange}/>
                                    </Td>
                                    <Td editmode={true}>
                                        <input type="date" name="forMonth" required="required" placeholder="귀속월을 입력해주세요." value={addFormData.forMonth} size='18' onChange={handleAddFormChange}/>
                                    </Td>
                                    <Td editmode={true}>
                                        <input type="text" name="acc" required="required" placeholder="계정을 입력해주세요." value={addFormData.acc} size='18' onChange={handleAddFormChange}/>
                                    </Td>
                                    <Td editmode={true}>
                                        <input type="date" name="payDate" required="required" placeholder="지출일자를 입력해주세요" value={addFormData.payDate} size='18' onChange={handleAddFormChange}/>
                                    </Td>
                                    <Td editmode={true}>
                                        <input type="text" name="dsc" required="required" placeholder="세부내용을 입력해주세요." value={addFormData.dsc} size='18' onChange={handleAddFormChange} />
                                    </Td>
                                    <Td editmode={true}>
                                        <input type="text" name="amt" required="required" placeholder="청구금액을 입력해주세요." value={formatCurrency(addFormData.amt)} size='18' onChange={handleAddFormChange}/>
                                    </Td>
                                    <Td editmode={true}>
                                        <Button type="submit">청구</Button>
                                    </Td>
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </TopicBody>
            </TopicContainer>
        </ScreenContainer>
    )
}