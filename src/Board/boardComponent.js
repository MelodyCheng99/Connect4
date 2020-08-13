import React from 'react';

import Square from '../Square/squareComponent'

import './boardComponent.css'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(42).fill(null),
            blueIsNext: true
        }
    }

    selectSquare(i) {
        const squares = this.state.squares.slice()
        for (let j = 5; j > 0; j--) {
            const curPosition = (7 * j) + (i % 7)
            if (squares[curPosition] == null) {
                squares[curPosition] = this.state.blueIsNext ? 'blue' : 'red'
                break
            }
        }
        this.setState({
            squares: squares,
            blueIsNext: !this.state.blueIsNext
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.selectSquare(i)} />
        )
    }

    renderRow(i) {
        return (
            <div>
                {this.renderSquare(7 * i)}
                {this.renderSquare((7 * i) + 1)}
                {this.renderSquare((7 * i) + 2)}
                {this.renderSquare((7 * i) + 3)}
                {this.renderSquare((7 * i) + 4)}
                {this.renderSquare((7 * i) + 5)}
                {this.renderSquare((7 * i) + 6)}
            </div>
        )
    }

    render() {
        return (
            <div className="board">
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
            </div>
        )
    }
}

export default Board