import { connect } from "react-redux";

import { loginSuccess } from "../actions/authActions.jsx"
import { Login } from "../components/Login/Login.jsx"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: () => dispatch(loginSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);