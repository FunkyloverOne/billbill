import React, { PropTypes } from 'react';

const DebtForm = ({ title, amount, user, submit }) => (
  <form onSubmit={(e) => {e.preventDefault();submit();}}>
    <div className="form-group">
      <label>Title:</label>
      <input type="text" className="form-control" placeholder="Something" value={title} />
    </div>
    <div className="form-group">
      <label>Amount:</label>
      <input type="text" className="form-control" placeholder="0.00" value={amount} />
    </div>
    <div className="form-group">
      <label>User:</label>
      <input type="text" className="form-control" placeholder="Username" value={user} />
    </div>
    <button className="btn btn-default btn-block">Submit</button>
  </form>
);

DebtForm.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  user: PropTypes.string,
  submit: PropTypes.func.isRequired,
};

export default DebtForm;
