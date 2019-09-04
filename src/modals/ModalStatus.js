import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@material-ui/core";

const ModalStatus = (props) => {
    return (
        <Dialog  open={props.openResult} onClose={() => props.handleResultClose()} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    {props.requestSuccess}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleResultClose()} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ModalStatus;
