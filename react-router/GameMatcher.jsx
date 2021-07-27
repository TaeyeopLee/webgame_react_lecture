import React, { PureComponent } from 'react';
import NumberBaseball from '../lec_3/NumberBaseball';
import RSP from '../lec_5/RSP';
import Lotto from '../lec_6/lotto';

class GameMatcher extends PureComponent {
  render() {
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />;
    }
    if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />;
    } 
    if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />;
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    );
  }
}

export default GameMatcher;
