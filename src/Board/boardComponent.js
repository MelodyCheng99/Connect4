import React from 'react'
import Confetti from 'react-confetti'

import Square from '../Square/squareComponent'

import './boardComponent.css'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(42).fill(null),
            blueIsNext: true,
            winner: null,
            width: 0,
            height: 0,
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    determineIfWon(curPosition, curPlayer, squares) {
        for (let leftMost = -3; leftMost <= 0; leftMost++) {
            if ((curPosition % 7) >= Math.abs(leftMost) && (curPosition % 7) <= 3 + Math.abs(leftMost) &&
                squares[curPosition + leftMost] === curPlayer && squares[curPosition + leftMost + 1] === curPlayer &&
                squares[curPosition + leftMost + 2] === curPlayer && squares[curPosition + leftMost + 3] === curPlayer) {
                    return curPlayer
            } else if ((curPosition % 7) >= Math.abs(leftMost) && (curPosition % 7) <= 3 + Math.abs(leftMost) &&
                (curPosition + (7 * leftMost) + leftMost) >= 0 && (curPosition + (7 * (leftMost + 3)) + leftMost + 3) <= 41 &&
                squares[curPosition + (7 * leftMost) + leftMost] === curPlayer && 
                squares[curPosition + (7 * (leftMost + 1)) + leftMost + 1] === curPlayer &&
                squares[curPosition + (7 * (leftMost + 2)) + leftMost + 2] === curPlayer && 
                squares[curPosition + (7 * (leftMost + 3)) + leftMost + 3] === curPlayer) {
                    return curPlayer
            } else if ((curPosition % 7) >= Math.abs(leftMost) && (curPosition % 7) <= 3 + Math.abs(leftMost) &&
                (curPosition - (7 * leftMost) + leftMost) >= 0 && (curPosition - (7 * (leftMost + 3)) + (leftMost + 3)) <= 41 &&
                squares[curPosition - (7 * leftMost) + leftMost] === curPlayer &&
                squares[curPosition - (7 * (leftMost + 1)) + (leftMost + 1)] === curPlayer &&
                squares[curPosition - (7 * (leftMost + 2)) + (leftMost + 2)] === curPlayer &&
                squares[curPosition - (7 * (leftMost + 3)) + (leftMost + 3)] === curPlayer) {
                    return curPlayer
            }   
        }

        if ((curPosition + 21) <= 41 && squares[curPosition + 7] === curPlayer &&
            squares[curPosition + 14] === curPlayer && squares[curPosition + 21] === curPlayer) {
            return curPlayer
        }

        return null
    }

    selectSquare(i) {
        const squares = this.state.squares.slice()
        let winner = this.state.winner

        for (let j = 5; j >= 0; j--) {
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
                onClick={() => this.state.winner == null ? this.selectSquare(i) : null} />
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
            <div className="gameScreen">
                { this.state.winner != null ?
                    <Confetti 
                        width={this.state.width} 
                        height={this.state.height} />
                    : null
                }

                <span className="textClass"> 
                    { this.state.winner != null ? 
                        (this.state.winner === 'blue' ? 'Blue Player Wins!' : 'Red Player Wins!') :
                        (this.state.blueIsNext ? 'Current Turn: Blue Player' : 'Current Turn: Red Player')
                    }
                </span> 

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