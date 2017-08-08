import * as React from 'react';
import * as classNames from 'classnames';

import './Layout.scss';

export const Card: React.StatelessComponent = ({children}) => {
  return (
    <div className="wlc_card">
      {children}
    </div>
  );
};

export const Divider: React.StatelessComponent<{
  negativeMargin?: number;
}> = ({negativeMargin}) => {
  const className = classNames('wlc_divider', {
    'wlc_divider--n1': negativeMargin === 1,
    'wlc_divider--n2': negativeMargin === 2,
    'wlc_divider--n3': negativeMargin === 3,
    'wlc_divider--n4': negativeMargin === 4,
  });
  return <hr className={className} />;
};
