import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  // 숫자 네개를 랜덤하게 겹치지않게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let ii = 0; ii < 4; ii++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - ii)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { value, answer, tries } = this.state;
    if (value === answer.join("")) {
      this.setState({
        result: "홈런 !",
        tries: [
          ...tries,
          { try: value, result: "홈런 !" },
        ],
      });
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `10번 틀려서 실패 ! 답은 ${answer.join(",")}였습니다 !`,
        });
        alert("게임을 다시 시작합니다 !");
        this.setState({
          value: "",
          ansewr: getNumbers(),
          tries: [],
        });
      } else {
        for (let ii = 0; ii < 4; ii++) {
          if (answerArray[ii] === answer[ii]) {
            strike += 1;
          } else if (answer.includes(answerArray[ii])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [
            ...tries,
            {
              try: value,
              result: `${strike} 스트라이크 ${ball} 볼`,
            },
          ],
          value: "",
        });
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
