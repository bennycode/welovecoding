import * as React from 'react';
import colors from 'src/constants/colors';

import './Tutorial.scss';

export const TutorialCard: React.StatelessComponent<{
  color?: keyof typeof colors;
}> = ({color}) => {
  const backgroundColor = colors[color];
  return <div className="wlc_tutorial-card" style={{backgroundColor}} />;
};
