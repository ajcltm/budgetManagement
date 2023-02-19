import React, { useState } from "react";
import {useQuery} from "react-query"
import axios from "axios"
import EditableData from "../components/EditableRows";
import { StyledButton } from "../components/styles/StyledButton.styled";
import { StyledEditableRows } from "../components/styles/StyledRows.styled";

const fetchRqm = () => {
    return axios.get("http://127.0.0.1:8000/rqm")
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
        forRqm:"",
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
        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue
        setAddFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/rqmAdd", addFormData)
        setRefetchingTogle(!refetchingTogle)
    }

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditRqmId(item.rqmId)
        const formValue = {
            rqmId : item.rqmId,
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
        const fieldName = event.target.getAttribute('name') 
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

    if (isLoading) {
        return <div> now is loading... </div>
    }

    return (
        <div className="rqm">
            <div className="table">
                <div className="table--header">
                    <div className="rqmTitle">청구 내역</div>
                </div>
                <div className="table--body">
                    <form className="rqmTableForm" onSubmit={handleEditFormSubmit}>
                        <table>
                            <th>청구번호</th>
                            <th>청구일자</th>
                            <th>청구인</th>
                            <th>귀속월</th>
                            <th>계정</th>
                            <th>지출일자</th>
                            <th>세부내역</th>
                            <th>금액</th>
                            <th>입금일자</th>
                            <th>편집</th>
                            {data?.data.data.map(item => 
                                <StyledEditableRows editMode={editRqmId===item.rqmId}>
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'rqmId'} value={item.rqmId} editableValue={item.rqmId} width={'200px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'rqmDate'} value={item.rqmDate} editableValue={item.rqmDate} width={'170px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'forRqer'} value={item.forRqer} editableValue={editFormData.forRqer} width={'100px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'forMonth'} value={item.forMonth} editableValue={editFormData.forMonth} width={'170px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'acc'} value={item.acc} editableValue={editFormData.acc} width={'100px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'date'} name={'payDate'} value={item.payDate} editableValue={editFormData.payDate} width={'170px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'dsc'} value={item.dsc} editableValue={editFormData.dsc} width={'260px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'amt'} value={item.amt} editableValue={editFormData.amt} width={'100px'} handleEditFormChange={handleEditFormChange}/> 
                                    <EditableData editMode={editRqmId===item.rqmId} type={'text'} name={'pybDate'} value={item.pybDate} editableValue={editFormData.pybDate} width={'170px'} handleEditFormChange={handleEditFormChange}/> 
                                    {editRqmId === item.rqmId ?(
                                        <>
                                            <td className="action">
                                                <StyledButton type="submit">저장</StyledButton>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>
                                                <StyledButton type="button" onClick={(event)=> handleEditClick(event, item)}>수정</StyledButton>
                                            </td>
                                            <td>
                                                <StyledButton type="button" onClick={(event)=> handleDeleteClick(event, item.rqmId)}>삭제</StyledButton>
                                            </td>
                                        </>
                                    )}
                                </StyledEditableRows>
                                )}
                        </table>
                    </form>
                </div>
            </div>

            <div className="rqmAdd">
                <div className="rqmTitle">청구하기</div>
                <div className="rqmAdd--body">
                    <form onSubmit={handleAddFormSubmit} className='rqmAddForm'>
                        <table className="rqmAdd-table">
                            <th className="add-forRqer">청구인</th>
                            <th className="add-forMonth">귀속월</th>
                            <th className="add-acc">계정</th>
                            <th className="add-payDate">지출일자</th>
                            <th className="add-dsc">세부내역</th>
                            <th className="add-amt">금액</th>
                            <th className="add-action">버튼</th>
                            <tr>
                                <td>
                                    <input type="text" name="forRqer" required="required" placeholder="청구인을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="date" name="forMonth" required="required" placeholder="귀속월을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="text" name="acc" required="required" placeholder="계정을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="date" name="payDate" required="required" placeholder="지출일자를 입력해주세요" size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="text" name="dsc" required="required" placeholder="세부내용을 입력해주세요." size='18' onChange={handleAddFormChange} />
                                </td>
                                <td>
                                    <input type="text" name="amt" required="required" placeholder="청구금액을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td className="action">
                                    <button type="submit">청구</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}