import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

import './Titlebar.css';

const Titlebar = () => {
  return (
    <div id='app-titlebar'>
      <div id='app-titlebar-drag-region'>
        <h1 id='app-titlebar-title'>Bermuda</h1>
      </div>
      <div id='app-titlebar-controls'>
        <FontAwesomeIcon
          icon={faMinusCircle}
          className='app-titlebar-controls-icon'
        />
        <FontAwesomeIcon
          icon={faTimesCircle}
          className='app-titlebar-controls-icon'
        />
      </div>
    </div>
  );
};

export default Titlebar;
