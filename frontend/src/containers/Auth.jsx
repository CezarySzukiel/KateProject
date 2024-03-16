import { connect } from "react-redux";

import { loginSuccess, setLoginToken, logoutSuccess, deleteLoginToken } from "../actions/authActions.jsx"
import { Login } from "../components/Login/Login.jsx"
import { Menu } from "../components/menu/Menu.jsx"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        loginToken: state.auth.loginToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: () => dispatch(loginSuccess()),
        logoutSuccess: () => dispatch(logoutSuccess()),
        setLoginToken: (token) => dispatch(setLoginToken(token)),
        deleteLoginToken: () => dispatch(deleteLoginToken()),
    };
};

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);