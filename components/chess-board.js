import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native'
import { styles } from './chess-board-styles'
import PropTypes from 'prop-types'

const boardDimensions = 8
const pieceImages = {
    blackKing: require('../assets/b_k.png'),
    blackQueen: require('../assets/b_q.png'),
    blackKnight: require('../assets/b_n.png'),
    blackBishop: require('../assets/b_b.png'),
    blackCastle: require('../assets/b_r.png'),
    blackPawn: require('../assets/b_p.png'),
    whiteKing: require('../assets/w_k.png'),
    whiteQueen: require('../assets/w_q.png'),
    whiteKnight: require('../assets/w_n.png'),
    whiteBishop: require('../assets/w_b.png'),
    whiteCastle: require('../assets/w_r.png'),
    whitePawn: require('../assets/w_p.png'),
}

class PieceView extends Component {
    render() {
        const piece = this.props.piece
        const {height, width} = Dimensions.get('window')
        const dimension = Math.min(height, width) / boardDimensions
        return <Image source={piece.image} style={{height: dimension, width: dimension}} />
    }
}

class SquareView extends Component {
    render() {
        const square = this.props.square
        const isGrey = (((square.position % boardDimensions) + Math.floor(square.position / boardDimensions)) % 2)
        const {height, width} = Dimensions.get('window')
        const dimension = Math.min(height, width) / boardDimensions
        return <View style={{backgroundColor: isGrey ? 'grey' : 'white', 
                             borderWidth: 0, 
                             borderColor: 'black', 
                             height: dimension, 
                             width: dimension}}> 
                    { square.piece != null &&  
                        <PieceView piece={square.piece} />
                    }
                </View>
    }
}

SquareView.propTypes = {
    isBlack: PropTypes.bool
}

class Castle {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackCastle : pieceImages.whiteCastle
    }
}

class Knight {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackKnight : pieceImages.whiteKnight
    }
}

class Bishop {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackBishop : pieceImages.whiteBishop
    }
}

class Queen {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackQueen : pieceImages.whiteQueen
    }
}

class King {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackKing : pieceImages.whiteKing
    }
}

class Pawn {
    constructor(isBlack) {
        this.isBlack = isBlack
        this.image = isBlack ? pieceImages.blackPawn : pieceImages.whitePawn
    }
}

class Square {
    constructor(position) {
        this.position = position
        switch (this.position) {
            case 0: case 7: case 56: case 63:
                this.piece = new Castle((position < 8))
                break
            case 1: case 6: case 57: case 62:
                this.piece = new Knight((position < 8))
                break
            case 2: case 5: case 58: case 61:
                this.piece = new Bishop((position < 8))
                break   
            case 3: case 59:
                this.piece = new Queen((position < 8)) 
                break     
            case 4: case 60:
                this.piece = new King((position < 8)) 
                break      
            case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55:
                this.piece = new Pawn((position < 16)) 
                break  
            default:
                this.piece = null
                break
        }
    }
}

export class ChessBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(boardDimensions * boardDimensions).fill().map((_, x) => new Square(x))
        }
    }

    square(x , y) {
        return this.state.squares[(y * boardDimensions) + x]
    }

    render() {
        return (
            <View style={styles.board}>
                { this.state.squares.map((square,position) => <SquareView square={square} /> ) }
            </View>
        )
    }
}