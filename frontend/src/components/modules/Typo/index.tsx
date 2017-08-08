import * as React from 'react';

const SIZES = {
  su: 'wlc-fontSize-su',
  xxl: 'wlc-fontSize-xxl',
  xl: 'wlc-fontSize-xl',
  l: 'wlc-fontSize-l',
  mPlus: 'wlc-fontSize-mPlus',
  m: 'wlc-fontSize-m',
  sPlus: 'wlc-fontSize-sPlus',
  s: 'wlc-fontSize-s',
  xs: 'wlc-fontSize-xs',
  mi: 'wlc-fontSize-mi',
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

export default Object.assign(Typo, {
  H1,
});
