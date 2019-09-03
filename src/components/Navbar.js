import React from 'react'
import {Link} from 'react-router-dom';
import ModalRegistration from "../modals/ModalRegistration";
import ModalAuthorization from "../modals/ModalAuthorization";
import {connect} from "react-redux";
import {logout} from '../actions';
import ModalEditProfile from "../modals/ModalEditProfile";
const navbarLink = {
    margin: '0 32px',
};

const logoutStyle = {
    margin: '10px',
    background: 'aliceblue',
    border: '2px solid salmon',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    cursor: 'pointer',
};

const userProfile = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin: '0 32px',
    width: '5%',
};

const serverUrl = 'http://192.168.2.135:3000/';

export class Navbar extends React.Component {

    logoutAccount = () => {
        this.props.onLogout() ;
    };

    render() {
        const {props} = this;
        return    (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <ul className="nav-links show-nav">
                            <li style={{listStyleType: 'none',display: 'flex',alignItems: 'center'}}>
                                <Link style={navbarLink} to="/">News</Link>
                                { !!props.userName && !!props.userEmail ?
                                    <>
                                        <Link style={userProfile} to={'/users/:'+props.userId}>
                                            <img
                                                style={{maxWidth: '100%'}}
                                                src={!!props.avatar ? props.provider==='site' ?
                                                    serverUrl+'images/' + props.avatar : props.avatar : ''}
                                                alt='No image'/>
                                            {props.userName}
                                        </Link>
                                        <ModalEditProfile/>
                                        <p style={{marginLeft: '10px'}} >Your Email ({props.userEmail}) </p>
                                        <input id='logout' style={logoutStyle} type='submit' value='Logout' onClick={this.logoutAccount} />
                                    </>
                                        :
                                        (<>
                                            <ModalRegistration />
                                            <ModalAuthorization />
                                        </>)
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        userName:state.data.userName,
        userEmail:state.data.userEmail,
        userId:state.data.userId,
        avatar: state.data.avatar,
        provider: state.data.provider,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(logout());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navbar);
