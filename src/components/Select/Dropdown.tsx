import { useCallback, useState } from 'react';
import { Option } from '.';
import Input from '../Input';

type Props = {
  value: Option[];
  options: Option[];
  onChange: (selected: Option) => void;
  deactivateDropdown: () => void;
  isLoading: boolean;
  isFilterSearch: boolean;
  searchValue: string;
  setSearchValue: (keyword: string) => void;
};

const Dropdown: React.FC<Props> = ({
  value,
  options,
  onChange,
  deactivateDropdown,
  isLoading,
  isFilterSearch,
  searchValue,
  setSearchValue,
}) => {
  const [keyword, setKeyword] = useState('');

  const selectOptionValue = (optionValue) => {
    onChange(optionValue);
    deactivateDropdown();
  };

  const removeSelectedOptions = (options: Option[]) => {
    return options.filter(
      (option) => !value.find((x) => x.value === option.value),
    );
  };

  const optionsFilteredBySearchValue = options.filter((option: Option) =>
    option.label.toString().toLowerCase().includes(searchValue.toLowerCase()),
  );

  const filteredOptions = removeSelectedOptions(optionsFilteredBySearchValue);

  const onChangeKeyword = useCallback(
    (newValue: string) => {
      setSearchValue(newValue);
    },
    [setSearchValue],
  );

  return (
    <div className="select-dropdown">
      {isFilterSearch && (
        <Input
          className="border border-gray-300"
          placeholder="Tìm kiếm..."
          value={keyword}
          onChange={(e) => {
            const newValue = e.currentTarget.value;
            setKeyword(newValue);
            onChangeKeyword(newValue);
          }}
        />
      )}

      <div className="options">
        {isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : filteredOptions.length ? (
          filteredOptions.map((option) => (
            <div
              className="option"
              onClick={() => selectOptionValue(option)}
              key={option.value}
            >
              <div className="flex items-center gap-2">
                {option.icon}
                <span className="option-value">{option.label}</span>
              </div>
              {option.suffix && (
                <span className="text-xs text-divider">{option.suffix}</span>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            Không tìm thấy dữ liệu
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
