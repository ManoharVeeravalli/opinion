import {useContext} from "react";
import {DialogContext} from "../context/dialog.context";


export function useDialog() {
    return useContext(DialogContext);
}

