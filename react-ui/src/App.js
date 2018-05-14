import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  componentDidMount() {
    fetch('/api/darkSky').then(res => {
      return res.json();
    }).then(data => {
      this.setState(() => ({message: data.message}));
    })
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
