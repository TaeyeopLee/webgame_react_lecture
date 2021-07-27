import React, { Component, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Ball from './Ball';
// useMemo는 값, useCallback은 함수
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
  // hooks는 실행순서가 매우매우 중요.
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setwinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // 패턴 ? ---------------------
  useEffect(() => {
    // ajax
  }, []);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    else {
      // ajax
    }
  }, [/** 바뀌는 값 */]);
  // -----------------------------

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
  
  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setwinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]) // winNumbers가 바뀌면 onClickRedo를 새로 기억함.

  return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} onClick={onClickRedo} />}{/**자식 컴포넌트에 함수를 넘길때 useCallback 사용해야 함. */}
        {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
      </>
  )
}

export default Lotto;
