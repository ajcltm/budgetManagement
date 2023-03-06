import styled from "styled-components";

export const Table = styled.table`

    width: 100%;
    border-collapse: collapse;

    th{
        position: sticky;
        top: 0;
        padding: 5px;
        border-bottom: .5px solid #ddd;
        background-color: #d6dcea;
        color: #0d0f31;
        text-align: center;
    }

    tr:hover {
        background-color: white;
        color: #0d0f31;
    }

    td{
        padding: 5px 2px;
        margin: 0px;
        font-size: 15px;
    }

    input {
        width: 100%;
        height: 100%;
        border: none;
        color: gray ;
        font-size: 15px;
        text-align: center;
        padding: 0px;
        margin: 0px;
        font-weight:700;
        background-color:white;
    }
    
    input::-webkit-input-placeholder{
        color: gray;
    }

    input[type="date"]::-webkit-inner-spin-button,

    input[type="date"]::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
    input[type="date"] {
        color: gray;
    }
`

export const Td = styled.td`
    width: ${({width}) => width};
    background-color: ${({editmode}) => editmode?'white':'transparent'};
    text-align:${({number})=>number?'right':'center'};
`
