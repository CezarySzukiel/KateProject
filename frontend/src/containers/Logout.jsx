import { connect } from "react-redux";

import { logoutSuccess } from "../actions/authActions.jsx"
import { Header } from "../components/header/Header.jsx"

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutSuccess: () => dispatch(logoutSuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);