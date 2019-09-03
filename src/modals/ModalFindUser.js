import React from "react";
import { connect } from 'react-redux';
import {inputCheck,checkEmptyFields,validateUser} from '../helpers/inputCheck';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import {userValidation, userTimerValidation} from "../helpers/validation";
import {findUser} from '../actions/index';


const FindUser = (props) => {

    const [state, setState] = React.useState({
        values: {
            userName: '',
        },

        fieldName: {
            error: false,
            value: 'Name',
        },
        open: false,
        openResult: false,
        timer: false,
    });

    const handleChange = value => event => {
        let findUser = state.values;
        findUser[value] = inputCheck(event.target.value);
        setState({...state,
            userName: findUser
        });
    };

    const handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    const handleClose = () => {
        setState({...state,
            open: false,
        });
    };

    const handleResultClose = () => {
        setState({...state,
            openResult: false,
        })
    };

    const handleSave = () => {
        let userName = checkEmptyFields(state.values);
        const inputCheck = validateUser(userName);
        if(inputCheck){
            props.onFindUser(userName);
            handleClose();
            setState({...state,
                openResult: true
            },() => setTimeout(() => {
                handleResultClose();
            }, 3000));
        } else {
            let objectFields = userValidation(inputCheck);
            setState(...state,
                objectFields
            );
            if(!state.timer){
                setState({...state,
                    timer: true
                }, () => {
                    setTimeout( () => {
                        let objectFields = userTimerValidation();
                        setState(
                            {...state,
                                objectFields
                            }
                        );
                    }, 3000)
                });
            }
        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleClickOpen()}>
                Find user GitHub
            </Button>
            <Dialog  open={state.open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Find repositories of user</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="userName"
                        name='userName'
                        label={state.fieldName.value}
                        placeholder="*Required"
                        type="text"
                        defaultValue={''}
                        onChange={handleChange('userName')}
                        error={state.fieldName.error}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary">
                        Find user
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog  open={state.openResult} onClose={() => handleResultClose()} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        {props.requestSuccess}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleResultClose()} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        requestSuccess: state.data.requestSuccess,
        repositories: state.data.repositories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFindUser: (userName) => {
            dispatch(findUser(userName))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindUser);
