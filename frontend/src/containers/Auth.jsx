import { connect } from "react-redux";

import { loginSuccess, setLoginToken, logoutSuccess, deleteLoginToken } from "../actions/authActions"
import { Login } from "../components/Login/Login"
import { Logout } from "../components/logout/Logout"
import { Menu } from "../components/menu/Menu"
import { UserData } from "../components/userData/UserData"

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

export const ConLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export const ConMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);
export const ConUserData = connect(mapStateToProps)(UserData);
export const ConLogout = connect(mapStateToProps)(Logout); 