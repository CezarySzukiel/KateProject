import { connect } from "react-redux";

import { loginSuccess, setAccessToken, logoutSuccess, deleteAccessToken, setRefreshToken, } from "../actions/authActions"
import { Login } from "../components/Login/Login"
import { Logout } from "../components/logout/Logout"
import { Menu } from "../components/menu/Menu"
import { UserData } from "../components/userData/UserData"
import { PasswordReset } from "../components/passwordReset/PasswordReset"
import { PasswordChange } from "../components/passwordChange/PasswordChange"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: () => dispatch(loginSuccess()),
        logoutSuccess: () => dispatch(logoutSuccess()),
        setAccessToken: (token) => dispatch(setAccessToken(token)),
        deleteAccessToken: () => dispatch(deleteAccessToken()),
        setRefreshToken: (token) => dispatch(setRefreshToken(token)),
    };
};

export const ConLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export const ConMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);
export const ConUserData = connect(mapStateToProps, mapDispatchToProps)(UserData);
export const ConLogout = connect(mapStateToProps, mapDispatchToProps)(Logout);
export const ConPasswordReset = connect(mapDispatchToProps)(PasswordReset);
export const ConPasswordChange = connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
