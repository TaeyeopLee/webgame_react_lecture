const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [ word, setWord ] = useState("신나");
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  input = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue('');
      input.current.focus();
    }
    else {
      setResult("땡");
      setValue("");
      input.current.focus();
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="wordInput">글자를 입력하세요.</label>
        <input ref={input} className="wordInput" value={value} onChange={onChangeInput} />
        <button>입력 !</button>
      </form>
      <div id="result">{result}</div>
    </>
  )
}

module.exports = WordRelay;