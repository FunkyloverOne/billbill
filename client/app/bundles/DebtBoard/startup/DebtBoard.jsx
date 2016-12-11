import React from 'react';
import ReactOnRails from 'react-on-rails';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

import DebtCardsPanel from '../components/DebtCardsPanel';
import LoanForm from '../components/LoanForm';
import DebtForm from '../components/DebtForm';

// _railsContext is the Rails context, providing contextual information for rendering
export default class DebtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: JSON.parse(JSON.stringify(props.loans)),
      debts: JSON.parse(JSON.stringify(props.debts)),
    };
  }

  componentDidMount() {
    var popupsCount = document.getElementById('popupContainer').children.length;
    if (popupsCount > 0) return;
    ReactDom.render(
      <Popup />,
      document.getElementById('popupContainer')
    );
  }

  newLoanPopup = () => {
    let submit = (data) => {
      axios.post(this.props.createLoansPath, data, {
        headers: ReactOnRails.authenticityHeaders(),
      }).then((response) => {
          this.setState(
            (prevState) => ({loans: prevState.loans.concat(response.data)})
          );
        })
        .catch((error) => {
          console.log(error);
        });

      Popup.close();
    }
    Popup.create({
      content: <LoanForm submit={submit} />,
    });
  }

  newDebtPopup = () => {
    let submit = (data) => {
      axios.post(this.props.createDebtsPath, data, {
        headers: ReactOnRails.authenticityHeaders(),
      }).then((response) => {
          this.setState(
            (prevState) => ({debts: prevState.debts.concat(response.data)})
          );
        })
        .catch((error) => {
          console.log(error);
        });

      Popup.close();
    }
    Popup.create({
      content: <DebtForm submit={submit} />,
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-4">
          <DebtCardsPanel
            title='They owe me'
            cards={this.state.loans}
            newCard={this.newLoanPopup}
          />
        </div>
        <div className="col-md-4">
          <DebtCardsPanel
            title='I owe them'
            cards={this.state.debts}
            newCard={this.newDebtPopup}
          />
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ DebtBoard });
