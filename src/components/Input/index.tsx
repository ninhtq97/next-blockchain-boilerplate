import { forwardRef } from 'react';
import Icon from '../Icon';

type Props = {
  error?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
} & React.HTMLProps<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(function Render(
  {
    className,
    label,
    icon,
    iconPosition = 'start',
    disabled,
    error,
    helperText,
    ...props
  },
  $ref,
) {
  return (
    <div className="relative flex flex-col w-full gap-1">
      {label && (
        <label className="text-sm xl:text-base text-gray-600">{label}</label>
      )}
      <div
        className={`text-field${className ? ` ${className}` : ''} ${
          error
            ? 'border-rose-500 text-rose-500 placeholder:text-rose-500'
            : 'placeholder:text-darkslateblue-200'
        }`}
      >
        {icon && iconPosition === 'start' && (
          <Icon className={`${error ? ' text-rose-500' : ''}`} icon={icon} />
        )}

        {disabled ? (
          <p className="ipt" ref={$ref}>
            {props.value}
          </p>
        ) : (
          <input
            type="text"
            className={`ipt${
              disabled ? ` cursor-default pointer-events-none` : ''
            }`}
            ref={$ref}
            {...props}
          />
        )}

        {icon && iconPosition === 'end' && (
          <Icon className={`${error ? ' text-rose-500' : ''}`} icon={icon} />
        )}
      </div>
      {error && <p className="text-xs text-rose-500 ml-2">{helperText}</p>}
    </div>
  );
});

export default Input;
