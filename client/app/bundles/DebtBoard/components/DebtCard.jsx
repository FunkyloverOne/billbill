import React, { PropTypes } from 'react';

export default class DebtCard extends React.Component {
  constructor(props) {
    super(props);

    switch(props.status) {
      case 'new_bill':
        this.statusName = 'New';
        this.statusClass = 'success';
        break;
      case 'open_bill':
        this.statusName = 'Open';
        this.statusClass = 'primary';
        break;
      case 'declined':
        this.statusName = 'Declined';
        this.statusClass = 'danger';
        break;
      case 'pending':
        this.statusName = 'Pending';
        this.statusClass = 'info';
        break;
      case 'reopen':
        this.statusName = 'Reopen';
        this.statusClass = 'warning';
        break;
      default:
        this.statusName = 'Paid';
        this.statusClass = 'default';
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="panel panel-default card">
        <div className="panel-body">
          <div className="row">
            <div className="col-xs-9 col-md-9">
              <span className={"label label-" + this.statusClass}>
                {this.statusName}
              </span>
              <p className="card-title">
                {this.props.title}
              </p>
            </div>
            <div className="col-xs-3 col-md-3">
              <div className="">
                <strong>${this.props.amount}</strong>
              </div>
              <div className="row">
                <div className="col-md-10">
                  <a  className="thumbnail card-avatar"
                      data-tip={this.props.user.fullName} >
                    <img  src={this.props.user.avatarUrl}
                          alt={this.props.user.fullName} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
