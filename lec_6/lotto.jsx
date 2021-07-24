import React, { Component, useEffect, useState, useRef } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getwinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers());
  const [winBalls, setwinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    for (let ii = 0; ii < winNumbers.length - 1; ii++) {
      timeouts.current[ii] = 
      setTimeout(() => {
        setwinBalls((prevBalls) => [...prevBalls, winNumbers[ii]]);
      }, (ii + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    
    return () => {
      timeouts.current.forEach((v) =>{
        clearTimeout(v);
      })
    }
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
  
  const runTimeouts = () => {
    for (let ii = 0; ii < winNumbers.length - 1; ii++) {
      timeouts.current[ii] = 
      setTimeout(() => {
        setwinBalls((prevBalls) => [...prevBalls, winNumbers[ii]]);
      }, (ii + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  }
  
  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setwinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }

  return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
      </>
  )
}
// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), // 당첨 숫자들
//     winBalls: [],
//     bonus: null, // 보너스 공
//     redo: false,
//   }
//   timeouts = [];

//   runTimeouts = () => {
//     const { winNumbers } = this.state;
//     for (let ii = 0; ii < this.state.winNumbers.length - 1; ii++) {
//       this.timeouts[ii] = 
//       setTimeout(() => {
//         this.setState((prevState) => {
//           return {
//             winBalls: [...prevState.winBalls, winNumbers[ii]],
//           }
//         })
//       }, (ii + 1) * 1000);
//     }
//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       })
//     }, 7000);
//   }
  
//   componentDidMount() {
//     this.runTimeouts();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//   }

//   componentWillUnmount() {
//     this.timeouts.forEach((t) => {
//       clearTimeout(v);
//     });
//   }

//   onClickRedo = () => {
//     this.setState({
//       winNumbers: getWinNumbers(), // 당첨 숫자들
//       winBalls: [],
//       bonus: null, // 보너스 공
//       redo: false,
//     })
//     this.timeouts = [];
//   }

//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="결과창">
//           {winBalls.map((v) => <Ball key={v} number={v} />)}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {redo && <button onClick={this.onClickRedo}>한 번 더 !</button>}
//       </>
//     )
//   }
// }

export default Lotto;
