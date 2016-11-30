import React from 'react';
import ReactOnRails from 'react-on-rails';

import DebtCardsPanel from '../components/DebtCardsPanel';

// _railsContext is the Rails context, providing contextual information for rendering
const DebtBoard = (props, _railsContext) => (
  <DebtCardsPanel {...props} />
);

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ DebtBoard });
