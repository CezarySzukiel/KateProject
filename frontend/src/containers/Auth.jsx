import { connect } from "react-redux";

import { 
    loginSuccess, 
    setAccessToken, 
    logoutSuccess, 
    deleteAccessToken, 
    setRefreshToken, 
    deleteRefreshToken ,
    setUserData,
    deleteUserData,
} from "../actions/authActions"
import { Login } from "../components/auth/Login"
import { Logout } from "../components/auth/Logout"
import { Menu } from "../components/menu/Menu"
import { HOC_UserData } from "../components/auth/HOC_UserData"
import { PasswordReset } from "../components/auth/PasswordReset"
import { PasswordChange } from "../components/auth/PasswordChange"
import { getTokens } from "../helpers"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken,
        userData: state.auth.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: () => dispatch(loginSuccess()),
        logoutSuccess: () => dispatch(logoutSuccess()),
        setAccessToken: (token) => dispatch(setAccessToken(token)),
        deleteAccessToken: () => dispatch(deleteAccessToken()),
        setRefreshToken: (token) => dispatch(setRefreshToken(token)),
        deleteRefreshToken: () => dispatch(deleteRefreshToken()),
        getTokens: (refreshToken) => dispatch(getTokens(refreshToken)),
        setUserData: (data) => dispatch(setUserData(data)),
        deleteUserData: () => dispatch(deleteUserData()),
    };
};

export const ConLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export const ConMenu = connect(mapStateToProps, mapDispatchToProps)(Menu);
export const ConUserData = connect(mapStateToProps, mapDispatchToProps)(HOC_UserData);
export const ConLogout = connect(mapStateToProps, mapDispatchToProps)(Logout);
export const ConPasswordReset = connect(mapDispatchToProps)(PasswordReset);
export const ConPasswordChange = connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
