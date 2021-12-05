import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={cx(
      'button',
      { outlined: isOutlined }
    )}
      {...props}
    />
  );
}

export default Button;
