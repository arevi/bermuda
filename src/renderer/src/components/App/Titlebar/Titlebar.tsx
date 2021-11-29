import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { WindowMessageType } from '../../../interfaces/Message';

import './Titlebar.css';

const Titlebar = () => {
  // Emits minimize event to window channel, should minimize window
  const minimizeWindow = () => {
    window.api.send('window', { type: WindowMessageType.Minimize });
  };

  // Emits close event to window channel, should close window
  const closeWindow = () => {
    window.api.send('window', { type: WindowMessageType.Close });
  };

  return (
    <div id='app-titlebar'>
      <div id='app-titlebar-drag-region'>
        <h1 id='app-titlebar-title'>Bermuda</h1>
      </div>
      <div id='app-titlebar-controls'>
        <button
          title='Minimize'
          onClick={minimizeWindow}
          className='app-titlebar-controls-icon-btn'
        >
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>

        <button
          title='Close'
          onClick={closeWindow}
          className='app-titlebar-controls-icon-btn'
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      </div>
    </div>
  );
};

export default Titlebar;
