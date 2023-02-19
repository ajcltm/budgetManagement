import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const fetchingBgs = () => {
    return axios.get('http://127.0.0.1:8000/bgs')
}

function ReadOnlyRows(props) {
    return(
        <tr className="read-only-row">
            <td className="forMonth">{props.item.forMonth}</td>
            <td className="acc">{props.item.acc}</td>
            <td className="amt">{props.item.bgd_amt}</td>
            <td className="amt">{props.item.rqm_amt}</td>
            <td className="amt">{props.item.bgd_amt - props.item.rqm_amt}</td>
        </tr>
    )
}

export default function Bgs() {
    const {isloading, data} = useQuery('bgs', fetchingBgs)

    if (isloading) {
        return <h2>Loading</h2>
    }

    return (
        <div className="bgs">
            <div className="table">
                <div className="table--header">
                    <div className="bgsTitle">예산 현황</div>
                </div>
                <div className="table--body">
                    <form className="bgsTableForm">
                        <table>
                            <th>월</th>
                            <th>계정</th>
                            <th>예산금액</th>
                            <th>지출금액</th>
                            <th>가용예산</th>
                            {data?.data.data.map(item => 
                                <>
                                    <ReadOnlyRows item={item} />
                                </>
                                )}
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}