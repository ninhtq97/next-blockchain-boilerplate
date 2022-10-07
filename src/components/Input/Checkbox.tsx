import { forwardRef, useState } from 'react';
import Icon from '../Icon';

type Props = {} & React.HTMLProps<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(function Render(
  { defaultChecked, onChange: onChangeProps, children },
  $ref,
) {
  const [stateChecked, setStateChecked] = useState(defaultChecked || false);
  const isControlled = Boolean(
    typeof defaultChecked === 'boolean' && !!onChangeProps,
  );
  const checked = isControlled ? defaultChecked : stateChecked;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setStateChecked((prev) => !prev);
    } else {
      onChangeProps?.(e);
    }
  };

  return (
    <label className="inline-flex gap-3 cursor-pointer">
      <div
        className={`relative w-5 h-5 bg border ${
          checked
            ? 'border-white before:opacity-80'
            : 'border-divider before:opacity-0'
        } rounded-[2px] duration-500 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-checkbox-active before:blur-[7px] before:rounded-[2px] before:duration-500`}
        ref={$ref}
      >
        <input
          type="checkbox"
          className="absolute top-0 left-0 w-[1px] h-[1px] -z-[1]"
          checked={checked}
          onChange={onChange}
        />

        <Icon
          className={`items-center justify-center relative h-full text-white duration-500 ${
            checked ? 'opacity-100' : 'opacity-0'
          }`}
          component="div"
          icon={<></>}
        />
      </div>
      {children}
    </label>
  );
});

export default Checkbox;
