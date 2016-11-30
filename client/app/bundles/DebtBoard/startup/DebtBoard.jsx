import React from 'react';
import ReactOnRails from 'react-on-rails';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

import DebtCardsPanel from '../components/DebtCardsPanel';
import DebtForm from '../components/DebtForm';

// _railsContext is the Rails context, providing contextual information for rendering
export default class DebtBoard extends React.Component {
  componentDidMount() {
    var popupsCount = document.getElementById('popupContainer').children.length;
    if (popupsCount > 0) return;
    ReactDom.render(
      <Popup />,
      document.getElementById('popupContainer')
    );
  }

  newDebtPopup = () => {
    const submit = () => {
      console.log(this);
    }
    Popup.create({
      content: <DebtForm submit={submit} />,
    });
  }

  render() {
    return (
      <div>
        {
          this.props.panels.map((panel) => {
            return (
              <div className="col-md-4" key={panel.title}>
                <DebtCardsPanel {...panel} newDebt={this.newDebtPopup} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ DebtBoard });
