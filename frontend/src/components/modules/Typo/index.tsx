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

const WEIGHTS = {
  thin: 'wlc_font-weight-thin' ,
  light: 'wlc_font-weight-light',
  roman: 'wlc_font-weight-roman',
  medium: 'wlc_font-weight-medium',
  bold: 'wlc_font-weight-bold',
  heavy: 'wlc_font-weight-heavy',
  black: 'wlc_font-weight-black',
};

const COLORS = {
  muted: 'wlc_font-color-mute',
  grey: 'wlc_font-color-grey',
};

const MARGINS = {
  none: 'wlc_font-margin-none',
  small: 'wlc_font-margin-small',
  medium: 'wlc_font-margin-medium',
  large: 'wlc_font-margin-large',
};

type SIZE_TYPE = keyof typeof SIZES;
type MARGIN_TYPE = keyof typeof MARGINS;

interface TypoProps {
  size?: SIZE_TYPE;
  children: React.ReactNode;
  tag?: string;
  margin?: MARGIN_TYPE;
}

const Typo: React.StatelessComponent<TypoProps> = ({tag = 'span', size = 'm', children}) => {
  return React.createElement(tag as any, {className: SIZES[size]}, children);
};

const H1: React.StatelessComponent<TypoProps> = ({size = 'xl', children, tag = 'h1'}) => {
  return React.createElement(tag as any, {className: SIZES[size]}, children);
};

const H2: React.StatelessComponent<TypoProps> = ({size = 'l', children}) => {
  return (
    <h2 className={SIZES[size]}>
      {children}
    </h2>
  );
};

const H3: React.StatelessComponent<TypoProps> = ({size = 'mPlus', children, tag = 'h3'}) => {
  return React.createElement(tag as any, {className: SIZES[size]}, children);
};

const Mute: React.StatelessComponent<TypoProps> = ({size = 's', children, tag = 'span'}) => {
  const classes = classNames(SIZES[size], COLORS.muted);
  return React.createElement(tag as any, {className: classes}, children);
};

const P: React.StatelessComponent<TypoProps> = ({size = 'm', children, tag = 'p'}) => {
  return React.createElement(tag as any, {className: SIZES[size]}, children);
};

const SubHeader: React.StatelessComponent<TypoProps> = ({children, tag = 'h3', margin = 'none'}) => {
  const classes = classNames(SIZES.xl, WEIGHTS.roman, COLORS.grey, MARGINS[margin]);
  return React.createElement(tag as any, {className: classes}, children);
};

export default Object.assign(Typo, {
  H1,
  H2,
  H3,
  P,
  Mute,
  SubHeader,
});
