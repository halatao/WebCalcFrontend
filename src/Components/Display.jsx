import React from 'react';
export default function (props){
    if(props.resultShown){
        return (
            <div>
                {props.result}
            </div>
        );
    }
    else{
        return (
            <div>
                {props.firstNumber} {props.operator} {props.secondNumber}
            </div>
        );
    }

}