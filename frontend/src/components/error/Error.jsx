import React from "react";
import "./error.css"

export const Error = ({ message }) => {
    return (
        <div className={'err'}>
            {message}
        </div>
    );
};
