import * as React from 'react';

import './Alert.scss';

const Alert: React.StatelessComponent<{
  children: React.ReactNode;
}> = ({children}) => {
  return (
    <div className="Alert">
      {children}
    </div>
  );
};

export default Alert;
