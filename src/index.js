import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const Test = () => React.createElement('button', null, 'Hello, World!');

const Test2 = () => <button>Hello, World 2!</button>;

const Header = ({ text }) => <h1>{text}</h1>;

const Element = <p>Paragraph</p>;

class Main extends React.Component {
  render() { /* props creates from components */
    console.log(this.props);
    return (
      <div className="main">
        <Header text={'свойство текст' + ' ' + this.props.count} />
        {Element}
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />

    {/* <Test />
    <Test2 />
    <FunctionComponents /> */}

    {/* <Main count={5}/> */}

  </React.StrictMode>,
  document.getElementById('root')
);