import { forwardRef } from 'react';

type Props = {
  component?: React.ElementType;
  clickable?: boolean;
  icon: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Icon = forwardRef<HTMLElement, Props>(function Render(
  { className, component: Wrapper = 'span', clickable, icon, ...props },
  $ref,
) {
  return (
    <Wrapper
      className={`flex${clickable ? ' cursor-pointer select-none' : ''}${
        className ? ` ${className}` : ''
      }`}
      ref={$ref}
      {...props}
    >
      {icon}
    </Wrapper>
  );
});

export default Icon;
