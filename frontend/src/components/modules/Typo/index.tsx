import * as React from 'react';
import * as classNames from 'classnames';

const SIZES = {
  su: 'wlc_font-size-su',
  xxl: 'wlc_font-size-xxl',
  xl: 'wlc_font-size-xl',
  l: 'wlc_font-size-l',
  mPlus: 'wlc_font-size-mPlus',
  m: 'wlc_font-size-m',
  sPlus: 'wlc_font-size-sPlus',
  s: 'wlc_font-size-s',
  xs: 'wlc_font-size-xs',
  mi: 'wlc_font-size-mi',
};

const COLORS = {
  muted: 'wlc_font-color-mute',
};

type SIZE_TYPE = keyof typeof SIZES;

interface TypoProps {
  size?: SIZE_TYPE;
  children: React.ReactNode;
}

const Typo: React.StatelessComponent<
  {
    tag: string;
  } & TypoProps
> = ({tag = 'span', size = 'm', children}) => {
  return React.createElement(
    tag as any,
    {
      className: SIZES[size],
    },
    children,
  );
};

const H1: React.StatelessComponent<TypoProps> = ({size = 'xl', children}) => {
  return (
    <h1 className={SIZES[size]}>
      {children}
    </h1>
  );
};

const H2: React.StatelessComponent<TypoProps> = ({size = 'l', children}) => {
  return (
    <h2 className={SIZES[size]}>
      {children}
    </h2>
  );
};

const H3: React.StatelessComponent<TypoProps> = ({
  size = 'mPlus',
  children,
}) => {
  return (
    <h3 className={SIZES[size]}>
      {children}
    </h3>
  );
};

const Mute: React.StatelessComponent<TypoProps> = ({size = 's', children}) => {
  const classes = classNames(SIZES[size], COLORS.muted);
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

const P: React.StatelessComponent<TypoProps> = ({size = 'm', children}) => {
  return (
    <p className={SIZES[size]}>
      {children}
    </p>
  );
};

export default Object.assign(Typo, {
  H1,
  H2,
  H3,
  P,
  Mute,
});
