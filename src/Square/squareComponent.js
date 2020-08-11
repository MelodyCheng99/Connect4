import React from 'react'

import './squareComponent.css'

function Square(props) {
    const circle = {
        display: "inline-block",
        marginTop: 12,
        borderRadius: "50%",
        width:30,
        height:30,
    }

    return (
        <button className="square" onClick={props.onClick}>
            <div style={Object.assign({ backgroundColor: props.value }, circle)} />
        </button>
    )
}

export default Square