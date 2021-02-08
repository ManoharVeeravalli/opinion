import {createContext} from "react";
import {DialogModal} from "../model/dialog.modal";


export const DialogContext = createContext<((o: DialogModal) => void)>(() => {
    throw new Error("unimplemented");
});
