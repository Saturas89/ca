import React from "react";
import {TextField} from "@mui/material";

export function EthAddress() {
    return <>
        <TextField
            id="recipient"
            label="Recipient address"
            placeholder="0xDe91...."
        />
    </>
}

//       <input id="recipient" placeholder="0xDe91...." type="text"/>