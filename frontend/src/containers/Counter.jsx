import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/counterActions';

const Counter = (props) => {
  return (
    <div>
      <p>Count: {props.count}</p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.decrement}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
