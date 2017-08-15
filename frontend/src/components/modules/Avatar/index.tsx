import * as React from 'react';

import './Avatar.scss';

const Avatar: React.StatelessComponent<any> = ({children}) => {
  return (
    <div className="wlc_avatar-container">
      <div className="wlc_avatar" />
      <div className="wlc_avatar-text">
        {children}
      </div>
    </div>
  );
};

export default Avatar;
