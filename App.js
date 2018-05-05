import React, { Component } from 'react';
import { ChessBoard } from './components/chess-board'

export default class App extends Component {
  render() {
    return (
      <ChessBoard />
    );
  }
}

console.disableYellowBox = true;