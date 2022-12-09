import Icon from 'components/Icon';
import useDebounce from 'hooks/useDebounce';
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
  isLoading?: boolean;
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
    isLoading = false,
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

  const debounceValue = useDebounce(searchValue, 300);

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
    debounceValue && setSearchValue('');
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
        className="!p-2 border rounded-lg"
        placement="bottom-start"
        renderLink={({ onClick, ref }) => (
          <>
            {label && <div className="select__label">{label}</div>}

            <div
              className={`select-container ${
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
                        <span className="select-value">{s.label}</span>
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
                  <span className="select-placeholder">{placeholder}</span>
                )}
              </div>
              <Icon
                className="items-center text-base"
                component="div"
                icon={
                  <>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="0.75em"
                      width="0.75em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                    </svg>
                  </>
                }
              />
            </div>
            {helperText && (
              <p className="text-xs text-rose-500 ml-2">{helperText}</p>
            )}
          </>
        )}
        renderContent={({ onClose }) => (
          <Dropdown
            value={selected}
            options={options}
            onChange={selectOption}
            deactivateDropdown={() => {
              onClose();
              setSearchValue('');
            }}
            isLoading={isLoading}
            isFilterSearch={isFilterSearch}
            searchValue={debounceValue}
            setSearchValue={setSearchValue}
          />
        )}
      />
    </div>
  );
});

export default Select;
