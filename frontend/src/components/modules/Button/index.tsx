import * as React from 'react';
import * as classNames from 'classnames';

import './Button.scss';

type ButtonReactProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.StatelessComponent<{
  type?: 'default' | 'primary' | 'info' | 'warning' | 'success';
  tagName?: string;
  children: React.ReactNode;
} &  ButtonReactProps> = ({children, type, tagName, className, ...props}) => {
  const buttonClasses = classNames('wlc_btn', {
    'wlc_button--primary': type === 'primary',
    'wlc_button--info': type === 'info',
    'wlc_button--warning': type === 'warning',
    'wlc_button--success': type === 'success',
  }, className);
  const tag = (tagName as any) || 'button';
  return React.createElement(tag, {
    className: buttonClasses,
    ...props,
  }, children);

};

export default Button;
