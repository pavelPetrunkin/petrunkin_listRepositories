import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {inputCheck} from "../helpers/inputCheck";

const ModalFind = (props) => {

    const handleChange = value => event => {
        let findUser;
        findUser = inputCheck(event.target.value);
        props.handleChange(findUser);
    };

    return (
        <Dialog  open={props.open} onClose={() => props.handleClose()} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Find repositories of user</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="userName"
                    name='userName'
                    label={props.fieldUserName.value}
                    placeholder="*Required"
                    type="text"
                    defaultValue={''}
                    onChange={handleChange('userName')}
                    error={props.fieldUserName.error}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => props.handleFind()} color="primary">
                    Find user
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ModalFind;
