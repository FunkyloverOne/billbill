import React, { PropTypes } from 'react';

const DebtCard = ({ title, amount, user }) => (
  <div className="panel panel-default card">
    <div className="panel-body">
      <div className="row">
        <div className="col-xs-9 col-md-9">
          <p className="card-title">
            {title}
          </p>
        </div>
        <div className="col-xs-3 col-md-3">
          <div className="">
            <strong>${amount}</strong>
          </div>
          <div className="row">
            <div className="col-md-10">
              <a href="#" className="thumbnail card-avatar">
                <img src={user.avatarUrl} alt="..." />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

DebtCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default DebtCard;
