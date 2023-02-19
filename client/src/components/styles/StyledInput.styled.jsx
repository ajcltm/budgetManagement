import styled from "styled-components";

export const StyledTd = styled.td`
    width: ${({width}) => width};
    & > input {
        width: 100%;
        height: 100%;
        border: none;
        color: red ;
        font-size: 15px;
        text-align: center;
        padding: 0px;
        margin: 0px;
    }
`