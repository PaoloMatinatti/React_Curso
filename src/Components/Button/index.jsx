import './styles.css'
import React from "react";
export class Button extends React.Component {
    render(){
        const {text, onClick,disabled} =this.props;
        return(
            <button
                disabled = {disabled}
                className = "button" 
                onClick={onClick}>
                {text}
            </button>
        );
    }
}