import axios from 'axios';
import { useState } from 'react';
import {useQuery} from 'react-query'

const fetchBgd = () => {
    return axios.get('http://127.0.0.1:8000/bgd')
}

function ReadOnlyRows(props) {
    return(
        <tr className="read-only-row">
            <td className="bgId">{props.item.bgId}</td>
            <td className="dpser">{props.item.dpser}</td>
            <td className="dpsDate">{props.item.dpsDate}</td>
            <td className="forMonth">{props.item.forMonth}</td>
            <td className="acc">{props.item.acc}</td>
            <td className="amt">{props.item.amt}</td>
            <td className="action">
                <button type="button" onClick={(event)=>{props.handleEditClick(event, props.item)}}>수정</button>
                <button type="button" onClick={(event)=>{props.handleDeleteClick(event, props.item.bgId)}}>삭제</button>
            </td>
        </tr>
    )
}

function EditableRow(props) {
    return (
        <tr className="editable-row">
            <td className="bgId">{props.item.bgId}</td>
            <td className="dpser">
                <input type="text" required="required" name="dpser" value={props.editFormData.dpser} maxLength='4' size='4' onChange={props.handleEditFormChange}/>
            </td>
            <td className="dpsDate">
                <input type="text" required="required" name="dpsDate" value={props.editFormData.dpsDate} maxLength='10' size='10' onChange={props.handleEditFormChange}/>
            </td>
            <td className="forMontn">
                <input type="text" required="required" name="forMonth" value={props.editFormData.forMonth} maxLength='10' size='10' onChange={props.handleEditFormChange}/>
            </td>
            <td className="acc">
                <input type="text" required="required" name="acc" value={props.editFormData.acc} maxLength='4' size='4' onChange={props.handleEditFormChange}/>
            </td>
            <td className="amt">
                <input type="text" required="required" name="amt" value={props.editFormData.amt} maxLength='7' size='7' onChange={props.handleEditFormChange}/>
            </td>
            <td className="action">
                <button type="submit">저장</button>
            </td>
        </tr>
    )
}

export default function Bgd () {

    const [addFormData, setAddFormData] = useState({
        bgId:"",
        dpser:"",
        dpsDate: "",
        forMonth: "",
        acc: "",
        amt: ""
    })

    const [editBgId, setEditBgId] = useState(null)
    const [editFormData, setEditFormData] = useState(null)

    const [refetchingTogle, setRefetchingTogle] = useState(false)
    const {isloading, data, isError, error} = useQuery([refetchingTogle], fetchBgd)

    if (isloading) {
        return <h2>Loading</h2>
    }

    if (isError) {
        return <h2>error</h2>
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData}
        newFormData[fieldName] = fieldValue
        setAddFormData(newFormData)
    }

    const handleDeleteClick = (event, bgId) => {
        event.preventDefault();
        console.log(bgId)
        axios.post("http://127.0.0.1:8000/bgdDelete", {bgId: bgId})
        setRefetchingTogle(!refetchingTogle)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();
        axios.post("http://127.0.0.1:8000/bgdAdd", addFormData)
        setRefetchingTogle(!refetchingTogle)
    }

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditBgId(item.bgId)
        const formValue = {
            bgId: item.bgId,
            dpser: item.dpser,
            dpsDate: item.dpsDate,
            forMonth: item.forMonth,
            acc: item.acc,
            amt: item.amt
        }
        setEditFormData(formValue)
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
        axios.post("http://127.0.0.1:8000/bgdUpdate", editFormData)
        setEditBgId(null)
        setRefetchingTogle(!refetchingTogle)
    }


    return (
        <div className='bgd'>
            <div className="table">
                <div className="table--header">
                    <div className="bgdTitle">입금 내역</div>
                </div>
                <div className="table--body">
                    <form onSubmit={handleEditFormSubmit} className="bgdTableForm">
                        <table>
                            <th>입금번호</th>
                            <th>입금자</th>
                            <th>입금일</th>
                            <th>귀속월</th>
                            <th>계정</th>
                            <th>금액</th>
                            <th>편집</th>
                            {data?.data.data.map(item => 
                                <>  
                                    {editBgId===item.bgId ? (
                                        <EditableRow item={item} editFormData={editFormData} handleEditFormChange={handleEditFormChange}/>
                                    ) : (
                                        <ReadOnlyRows item={item} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick}/>
                                    )}  
                                </>
                            )}
                        </table>
                    </form>
                </div>
            </div>
            <div className="bgdAdd">
                <div className="bgdTitle">입금 등록하기</div>
                <div className="bgdAdd--body">
                    <form onSubmit={handleAddFormSubmit} className='bgdAddForm'>
                        <table className="bgdAdd-table">
                            <th className="add-dpser">입금인</th>
                            <th className="add-dpsDate">입금일자</th>
                            <th className="add-forMonth">귀속월</th>
                            <th className="add-acc">계정</th>
                            <th className="add-amt">금액</th>
                            <th className="add-action">버튼</th>
                            <tr>
                                <td>
                                    <input type="text" name="dpser" required="required" placeholder="입금인을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="date" name="dpsDate" required="required" placeholder="입금일자를 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="date" name="forMonth" required="required" placeholder="귀속월을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="text" name="acc" required="required" placeholder="계정을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td>
                                    <input type="text" name="amt" required="required" placeholder="입금액을 입력해주세요." size='18' onChange={handleAddFormChange}/>
                                </td>
                                <td className="action">
                                    <button type="submit">등록</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}