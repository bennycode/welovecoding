import * as React from 'react';
import * as classNames from 'classnames';

import './Button.scss';

type ButtonReactProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.StatelessComponent<
  {
    type?:
      | 'default'
      | 'primary'
      | 'info'
      | 'warning'
      | 'success'
      | 'white'
      | 'grey';
    tagName?: string;
    children: React.ReactNode;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    outline?: boolean;
    href?: string;
  } & ButtonReactProps
> = ({
  children,
  type,
  tagName,
  className,
  small,
  medium,
  large,
  outline,
  href,
  ...props,
}) => {
  const buttonClasses = classNames(
    'wlc_btn',
    {
      'wlc_btn--outline': type === undefined && outline,
      [`wlc_btn--${outline ? 'outline-' : ''}primary`]: type === 'primary',
      [`wlc_btn--${outline ? 'outline-' : ''}info`]: type === 'info',
      [`wlc_btn--${outline ? 'outline-' : ''}warning`]: type === 'warning',
      [`wlc_btn--${outline ? 'outline-' : ''}success`]: type === 'success',
      [`wlc_btn--${outline ? 'outline-' : ''}white`]: type === 'white',
      [`wlc_btn--${outline ? 'outline-' : ''}grey`]: type === 'grey',
      'wlc_btn--size-small': small,
      'wlc_btn--size-medium': medium,
      'wlc_btn--size-large': large,
    },
    className,
  );
  const tag = (tagName as any) || (href !== undefined ? 'a' : 'button');
  return React.createElement(
    tag,
    {
      className: buttonClasses,
      href,
      ...props,
    },
    children,
  );
};

export default Button;
