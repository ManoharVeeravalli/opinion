import React, {FC, useState} from 'react';
import {DialogModal} from "../../model/dialog.modal";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Dialog as MaterialDialog} from "@material-ui/core";
import {DialogContext} from "../../context/dialog.context";

const Dialog: FC = ({children}) => {
    const [{title, description, open}, setState] = useState<DialogModal>({
        description: '',
        open: false,
        title: ''
    });
    let dialog = null;
    if (open) {
        dialog = <MaterialDialog
            open={open}
            onClose={() => setState({open: false})}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setState({open: false})} color="primary" autoFocus>
                    ok
                </Button>
            </DialogActions>
        </MaterialDialog>
    }
    return (
        <DialogContext.Provider value={setState}>
            {dialog}
            {children}
        </DialogContext.Provider>
    );
}

export default Dialog;
