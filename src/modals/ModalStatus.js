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
        <Dialog  open={props.openStatus} onClose={() => props.handleStatusClose()} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    {props.requestSuccess}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleStatusClose()} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ModalStatus;
