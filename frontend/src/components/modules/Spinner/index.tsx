// adapted from https://github.com/chenglou/react-spinner

import * as React from 'react';

import './Spinner.scss';

const Spinner: React.StatelessComponent<{
  className?: string;
}> = props => {
  const bars = [];

  for (let i = 0; i < 12; i++) {
    const animationDelay = (i - 12) / 10 + 's';
    const transform = 'rotate(' + i * 30 + 'deg) translate(146%)';
    const barStyle = {
      WebkitAnimationDelay: animationDelay,
      animationDelay,
      WebkitTransform: transform,
      transform,
    };

    bars.push(<div style={barStyle} className="react-spinner_bar" key={i} />);
  }

  return (
    <div {...props} className={(props.className || '') + ' react-spinner'}>
      {bars}
    </div>
  );
};

export default Spinner;
