import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {checkEmptyFields,validateUser} from '../helpers/inputCheck';
import {
    Button,
} from "@material-ui/core";
import {userValidation} from "../helpers/validation";
import {findUser} from '../actions/index';
import ModalFind from "./ModalFind";
import ModalStatus from "./ModalStatus";

const FindUser = (props) => {

    const [state, setState] = React.useState({
        userName : '',
    });

    const [fieldUserName, setFieldUserName] = React.useState({ fieldUserName: {
            error: false,
            value: 'User Name',
        }});

    const [open, setOpen] = React.useState({ open: false });

    const [openResult, setOpenResult] = React.useState({ openResult: false });

    const [timer, setTimer] = React.useState({ timer: false });

    const handleChange = value => {
        setState({
            userName: value
        });
    };

    const handleClickOpen = () => {
        setOpen({
            open: true
        });
    };

    const handleClose = () => {
        setOpen({
            open: false,
        });
    };

    const handleResultClose = () => {
        setOpenResult({
            openResult: false,
        })
    };

    useEffect(() => {
        if(openResult.openResult){
            setTimeout(() => {
                handleResultClose();
            }, 3000);
        }
        if(timer.timer){
            setTimeout( () => {
                setFieldUserName({
                    fieldUserName: {
                        error: false,
                        value: 'User name',
                    },
                });
                setTimer(
                    {
                        timer:false
                    }
                );
            }, 3000)
        }
    });

    const handleFind = () => {
        let userName = checkEmptyFields(state);
        const inputCheck = validateUser(userName);
        if(inputCheck){
            props.findUser(userName);
            setOpen({
                open: false
            });
            setOpenResult({
                openResult: true
            });
        } else {
            let objectFields = userValidation(inputCheck);
            if(!timer.timer){
                setTimer({
                    timer: true
                });
                setFieldUserName({
                    fieldUserName: objectFields
                });
            } else{
                setFieldUserName({
                    fieldUserName: objectFields
                    }
                );
            }
        }
    };
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleClickOpen()}>
                Find user GitHub
            </Button>
            <ModalFind open={open.open}
                       state={state}
                       fieldUserName={fieldUserName.fieldUserName}
                       handleClose={handleClose}
                       handleFind={handleFind}
                       handleChange={handleChange}
                       />

            <ModalStatus requestSuccess={props.requestSuccess}
                         handleResultClose={handleResultClose}
                         openResult={openResult.openResult}
                         />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        requestSuccess: state.data.requestSuccess,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        findUser: (userName) => {
            dispatch(findUser(userName))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindUser);
