import React from "react";
import { StyledTd } from "./styles/StyledInput.styled";

const EditTd = (props) => {
    return (
        <StyledTd width={props.width}>
            <input type = {props.type} name={props.name} value={props.value} onChange={props.handleEditFormChange}/>
        </StyledTd>
    )
}

export default function EditableData(props) {
    return (
        <>
            {props.editMode?(
                <>
                    <EditTd type={props.type} name={props.name} value={props.editableValue} width={props.width} handleEditFormChange={props.handleEditFormChange}/>
                </>
            ):(
                <>
                    <StyledTd width={props.width}>{props.value}</StyledTd>
                </>
            )
            }
        </>
    )
}