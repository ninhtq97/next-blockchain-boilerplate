import { ComponentProps, forwardRef } from 'react';
import Icon from '../Icon';

type Props = {
  decorateClassName?: Partial<Record<'top' | 'bottom', string>>;
  icon?: React.ReactNode;
  loading?: boolean;
  loadingPosition?: 'start' | 'end' | 'center';
  loadingIndicator?: string;
} & ComponentProps<'button'>;

const Button = forwardRef<HTMLButtonElement, Props>(function Render(
  {
    className,
    decorateClassName,
    icon,
    loading = false,
    loadingPosition = 'start',
    loadingIndicator = 'Loading',
    children,
    ...props
  },
  $ref,
) {
  return (
    <button
      className={`btn${className ? ` ${className}` : ''}`}
      {...props}
      ref={$ref}
    >
      {decorateClassName && (
        <div className={`decorate top ${decorateClassName.top}`} />
      )}

      {icon && <span className="mr-2">{icon}</span>}
      {loading ? (
        <div className="flex items-center gap-2">
          <Icon icon={<></>} />
          {loadingIndicator}
        </div>
      ) : (
        children
      )}
      {decorateClassName && (
        <div className={`decorate bottom ${decorateClassName.bottom}`} />
      )}
    </button>
  );
});

export default Button;
