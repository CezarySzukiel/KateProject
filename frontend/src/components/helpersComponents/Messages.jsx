import React from "react";
import "./messages.css"

export const Error = ({ message }) => {
    return (
        <div className={'err'}>
            {message}
        </div>
    );
};

export const Info = ({ message }) => {
    return (
        <div className={'info'}>
            {message}
        </div>
    );
};
