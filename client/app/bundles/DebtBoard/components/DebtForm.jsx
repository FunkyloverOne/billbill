import React, { PropTypes } from 'react';

export default class DebtForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || '',
      amount: props.amount || '',
      user: props.user || '',
    };
  }

  static propTypes = {
    title: PropTypes.string,
    amount: PropTypes.number,
    user: PropTypes.string,
    submit: PropTypes.func.isRequired,
  };

  getData = () => ({
    title: this.state.title,
    amount: parseFloat(this.state.amount),
    debtors: [{email: this.state.user}],
  });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.getData());
  };

  changeAmount = (e) => {
    this.setState({amount: e.target.value});
  };

  changeTitle = (e) => {
    this.setState({title: e.target.value});
  };

  changeUser = (e) => {
    this.setState({user: e.target.value});
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Something"
            value={this.state.title}
            onChange={this.changeTitle}
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="text"
            className="form-control"
            placeholder="0.00"
            value={this.state.amount}
            onChange={this.changeAmount}
          />
        </div>
        <div className="form-group">
          <label>User:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username or Email"
            value={this.state.user}
            onChange={this.changeUser}
          />
        </div>
        <button className="btn btn-default btn-block">Submit</button>
      </form>
    );
  }
}
