import Icon from 'components/Icon';
import { forwardRef, useEffect, useState } from 'react';
import { unique } from 'utils';
import Popover from '../Popover';
import Dropdown from './Dropdown';

export type Option = {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
};

type Props = {
  className?: string;
  isMultiple?: boolean;
  isDisable?: boolean;
  isFilterSearch?: boolean;
  label?: string;
  value?: string | number;
  options: Option[];
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onChange: (selected: string | number | (string | number)[]) => void;
};

const Select = forwardRef<HTMLDivElement, Props>(function Render(
  {
    className,
    isMultiple,
    isDisable,
    isFilterSearch = true,
    label,
    value,
    options,
    placeholder,
    error,
    helperText,
    onChange,
  },
  $ref,
) {
  const [selected, setSelected] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let defaultSelected: Option[] = [];
    const isArray = Array.isArray(value);

    if (options.length) {
      const opts = isArray
        ? value.map((e) => options.find((x) => x.value === e))
        : [options.find((x) => x.value === value)];

      defaultSelected = unique(opts.filter((x) => x));
      setSelected(defaultSelected);
    }
  }, [options, value]);

  const selectOption = (option: Option) => {
    onChange(
      isMultiple
        ? unique([...selected.map((e) => e.value), option.value])
        : option.value,
    );
    setSelected((prev) => (isMultiple ? unique([...prev, option]) : [option]));
    searchValue && setSearchValue('');
  };

  const removeSelected = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    option: Option,
  ) => {
    e.stopPropagation();

    const restSelected = selected.filter((x) => x.value !== option.value);
    setSelected(restSelected);
    onChange(restSelected.map((e) => e.value));
  };

  return (
    <div
      className={`select${isDisable ? ` pointer-events-none` : ''}`}
      ref={$ref}
    >
      <Popover
        className="select !p-2 border rounded-lg"
        placement="bottom-start"
        renderLink={({ onClick, ref }) => (
          <>
            {label && <div className="select__label">{label}</div>}

            <div
              className={`select__value-container ${
                error ? 'text-rose-500' : 'text-gray-500'
              }${className ? ` ${className}` : ''}`}
              onClick={onClick}
              ref={ref as React.RefObject<HTMLDivElement>}
            >
              <div className="flex items-center flex-1 gap-2">
                {selected.length > 0 ? (
                  selected.map((s, i) => (
                    <div
                      className={`relative flex items-center gap-2 duration-500${
                        isMultiple
                          ? ' cursor-pointer bg-select-multiple px-2 rounded'
                          : ''
                      }`}
                      key={s.value}
                    >
                      <div className="flex items-center gap-2">
                        {s.icon}
                        <span className="select__value">{s.label}</span>
                      </div>

                      {isMultiple && (
                        <Icon
                          component="div"
                          icon={<></>}
                          onClick={(e) => removeSelected(e, s)}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <span className="select__value-container__placeholder">
                    {placeholder}
                  </span>
                )}
              </div>
              <Icon
                className="items-center text-base"
                component="div"
                icon={<></>}
              />
            </div>
            {helperText && (
              <p className="text-xs text-rose-500 ml-2">{helperText}</p>
            )}
          </>
        )}
        renderContent={() => (
          <Dropdown
            value={selected}
            options={options}
            onChange={selectOption}
            isLoading={isLoading}
            isFilterSearch={isFilterSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      />
    </div>
  );
});

export default Select;
