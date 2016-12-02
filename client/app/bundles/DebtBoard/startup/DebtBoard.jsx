import React from 'react';
import ReactOnRails from 'react-on-rails';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

import DebtCardsPanel from '../components/DebtCardsPanel';
import DebtForm from '../components/DebtForm';

// _railsContext is the Rails context, providing contextual information for rendering
export default class DebtBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLists:
        props.panels.map(
          (panel) => JSON.parse(JSON.stringify(panel.cards))
        ),
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

  newDebtPopup = (target) => {
    const submit = (data) => {
      this.setState((prevState) => {
        let cardLists = JSON.parse(JSON.stringify(prevState.cardLists));
        cardLists[target.id].push(data);
        return {cardLists: cardLists};
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
        {
          this.props.panels.map((panel, i) => {
            return (
              <div className="col-md-4" key={panel.title}>
                <DebtCardsPanel
                  id={i}
                  title={panel.title}
                  cards={this.state.cardLists[i]}
                  newDebt={this.newDebtPopup}
                />
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
