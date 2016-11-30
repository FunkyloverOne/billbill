import React, { PropTypes } from 'react';
import DebtCard from '../components/DebtCard';

export default class DebtCardsPanel extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
    newDebt: PropTypes.func.isRequired,
  };

  handleNewDebtClick = (e) => {
    e.preventDefault();
    this.props.newDebt();
  };

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          {this.props.cards.length <= 0 && 'No debts yet, hooray!'}
          {
            this.props.cards.map((card, i) => {
              return (
                <DebtCard key={i} {...card} />
              );
            })
          }
        </div>
        <div className="panel-footer">
          <a href="#" onClick={this.handleNewDebtClick}>Add new debt</a>
        </div>
      </div>
    );
  }
}
