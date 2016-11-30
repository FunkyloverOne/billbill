import React, { PropTypes } from 'react';
import DebtCard from '../components/DebtCard';

const DebtCardsPanel = ({ title, cards }) => (
  <div className="panel panel-primary">
    <div className="panel-heading">
      <h3 className="panel-title">{title}</h3>
    </div>
    <div className="panel-body">
      {cards.length <= 0 && 'No debts yet, hooray!'}
      {
        cards.map((card, i) => {
          return (
            <DebtCard key={i} title={card.title} amount={card.amount} user={card.user} />
          );
        })
      }
    </div>
    <div className="panel-footer">
      <a href="#">Add new debt</a>
    </div>
  </div>
);

DebtCardsPanel.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default DebtCardsPanel;
