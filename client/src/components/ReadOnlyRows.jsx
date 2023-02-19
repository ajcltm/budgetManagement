import React from "react";
import { StyledRows } from "./styles/StyledRows.styled";

export default function ReadOnlyRow(props) {
    return (
        <StyledRows>
            {Object.values(props.item).map(i => 
                <>
                    <td>{i}</td>
                </>
            )}
        </StyledRows>
    )
}
