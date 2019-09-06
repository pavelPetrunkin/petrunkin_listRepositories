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

const ModalGetUser = (props) => {

    const [name, setName] = React.useState('');

    const [fieldUserName, setFieldUserName] = React.useState({ fieldUserName: {
            error: false,
            value: 'User Name',
        }});

    const [open, setOpen] = React.useState(false);

    const [openStatus, setOpenStatus] = React.useState(false );

    const [timer, setTimer] = React.useState(false);

    const handleChange = value => {
        setName(value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusClose = () => {
        setOpenStatus(false)
    };

    useEffect(() => {
        if(openStatus){
            setTimeout(() => {
                handleStatusClose();
            }, 3000);
        }
        if(timer){
            setTimeout( () => {
                setFieldUserName({
                    fieldUserName: {
                        error: false,
                        value: 'User name',
                    },
                });
                setTimer(false);
            }, 3000)
        }
    });

    const handleFind = () => {
        let userName = checkEmptyFields(name);
        const inputCheck = validateUser(userName);
        if(inputCheck){
            props.findUser(userName);
            setOpen(false);
            setOpenStatus(true);
        } else {
            let objectFields = userValidation(inputCheck);
            if(!timer){
                setTimer(true);
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
            <ModalFind open={open}
                       fieldUserName={fieldUserName.fieldUserName}
                       handleClose={handleClose}
                       handleFind={handleFind}
                       handleChange={handleChange}
                       />

            <ModalStatus requestSuccess={props.requestSuccess}
                         handleStatusClose={handleStatusClose}
                         openStatus={openStatus}
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
)(ModalGetUser);
