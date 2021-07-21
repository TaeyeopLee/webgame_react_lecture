const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "신나",
    value: "",
    result: "",
  };
  input;
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      })
      this.input.focus();
    }
    else {
      this.setState({
        reulst: "땡",
        value: '',
      })
      this.input.focus();
    }
  }

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  onRefInput = (c) => {
    this.input = c;
  }
  
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력 !</button>
        </form>
        <div id="result">{this.state.result}</div>
      </>
    ) 
  }
}

module.exports = WordRelay;