import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ModalFindUser from "../modals/ModalFindUser";

const FindUser = (props) => {
        return (
            <div>
                <div className='modal-props'>
                    <ModalFindUser/>
                </div>
                <div className='user-info'>
                {props.userName ?
                    <>
                        <p className='currentUser'>User name: {props.userName}</p>
                        <Link className='link' to='/user-repositories'>User repositories: {props.repositories.length}</Link>
                        <Link className='link' to='/Organization-repositories'>Organization repositories {props.orgRepositories.length}</Link>
                    </>
                    : <p>No user</p>}
                </div>
            </div>
        );
};

const mapStateToProps = state => {
    return {
        repositories: state.data.repositories,
        orgRepositories: state.data.orgRepositories,
        userName: state.data.userName,
    };
};

export default connect(
    mapStateToProps,
    null,
)(FindUser);
