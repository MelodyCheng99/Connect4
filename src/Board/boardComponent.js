import React from 'react';

import Square from '../Square/squareComponent'

import './boardComponent.css'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(42).fill(null),
            blueIsNext: true,
            winner: null,
        }
    }

    determineIfWon(curPosition, curPlayer, squares) {
        if ((curPosition % 7) >= 3 && squares[curPosition - 1] == curPlayer &&
            squares[curPosition - 2] == curPlayer && squares[curPosition - 3] == curPlayer) {
            return curPlayer
        } else if ((curPosition % 7) >= 2 && (curPosition % 7) <= 5 &&
            squares[curPosition - 1] == curPlayer && squares[curPosition - 2] == curPlayer && squares[curPosition + 1] == curPlayer) {
            return curPlayer
        } else if ((curPosition % 7) >= 1 && (curPosition % 7) <= 4 &&
            squares[curPosition - 1] == curPlayer && squares[curPosition + 1] == curPlayer && squares[curPosition + 2] == curPlayer) {
            return curPlayer
        } else if ((curPosition % 7) <= 3 && squares[curPosition + 1] == curPlayer &&
            squares[curPosition + 2] == curPlayer && squares[curPosition + 3] == curPlayer) {
            return curPlayer

        } else if ((curPosition + 21) <= 41 && squares[curPosition + 7] == curPlayer &&
            squares[curPosition + 14] == curPlayer && squares[curPosition + 21] == curPlayer) {
            return curPlayer
        } else if ((curPosition + 14) <= 41 && (curPosition - 7) >= 0 &&
            squares[curPosition + 7] == curPlayer && squares[curPosition + 14] == curPlayer && squares[curPosition - 7] == curPlayer) {
            return curPlayer
        } else if ((curPosition + 7) <= 41 && (curPosition - 14) >= 0 &&
            squares[curPosition + 7] == curPlayer && squares[curPosition - 7] == curPlayer && squares[curPosition - 14] == curPlayer) {
            return curPlayer
        } else if ((curPosition - 21) >= 0 && squares[curPosition - 7] == curPlayer &&
            squares[curPosition - 14] == curPlayer && squares[curPosition - 21] == curPlayer) {
            return curPlayer
        }

        return null
    }

    selectSquare(i) {
        const squares = this.state.squares.slice()
        let winner = this.state.winner

        for (let j = 5; j > 0; j--) {
            const curPosition = (7 * j) + (i % 7)
            if (squares[curPosition] == null) {
                const curPlayer = this.state.blueIsNext ? 'blue' : 'red'
                squares[curPosition] = curPlayer
                winner = this.determineIfWon(curPosition, curPlayer, squares)
                break
            }
        }

        this.setState({
            squares: squares,
            blueIsNext: !this.state.blueIsNext,
            winner: winner
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
            <div>
                { this.state.winner ? <span> You Win! </span> : null }

                <div className="board">
                    {this.renderRow(0)}
                    {this.renderRow(1)}
                    {this.renderRow(2)}
                    {this.renderRow(3)}
                    {this.renderRow(4)}
                    {this.renderRow(5)}
                </div>
            </div>
        )
    }
}

export default Board