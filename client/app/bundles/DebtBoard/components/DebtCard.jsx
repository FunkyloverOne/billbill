import React, { PropTypes } from 'react';

export default class DebtCard extends React.Component {
  constructor(props) {
    super(props);

    switch(props.status) {
      case 'new_bill':
        this.statusName = 'New';
        this.statusClass = 'success';
        if (this.props.type == 'loan') {
          this.buttons = [{class: 'warning', title: 'Cancel'},];
        } else {
          this.buttons = [
            {class: 'success', title: 'Accept'},
            {class: 'danger', title: 'Decline'},
          ];
        }
        break;
      case 'open_bill':
        this.statusName = 'Open';
        this.statusClass = 'primary';
        if (this.props.type == 'loan') {
          this.buttons = [{class: 'success', title: 'Close'},];
        } else {
          this.buttons = [
            {class: 'success', title: 'Close'},
          ];
        }
        break;
      case 'declined':
        this.statusName = 'Declined';
        this.statusClass = 'danger';
        if (this.props.type == 'loan') {
          this.buttons = [];
        } else {
          this.buttons = [
            {class: 'success', title: 'Resend'},
            {class: 'warning', title: 'Cancel'},
          ];
        }
        break;
      case 'pending':
        this.statusName = 'Pending (Almost Closed)';
        this.statusClass = 'info';
        if (this.props.type == 'loan') {
          this.buttons = [
            {class: 'success', title: 'Accept'},
            {class: 'danger', title: 'Decline'},
          ];
        } else {
          this.buttons = [
            {class: 'warning', title: 'Cancel'},
          ];
        }
        break;
      case 'reopen':
        this.statusName = 'Reopen';
        this.statusClass = 'warning';
        if (this.props.type == 'loan') {
          this.buttons = [{class: 'success', title: 'Close'},];
        } else {
          this.buttons = [
            {class: 'success', title: 'Close'},
          ];
        }
        break;
      default:
        this.statusName = 'Paid';
        this.statusClass = 'default';
        this.buttons = [];
    };
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  renderButtons = () => {
    if (!this.buttons.length) return;
    return (
      <div className="btn-group btn-group-sm">
        {
          this.buttons.map((button) => {
            return (
              <button key={button.title} className={"btn btn-" + button.class}>
                {button.title}
              </button>
            );
          })
        }
      </div>
    );
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
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}
