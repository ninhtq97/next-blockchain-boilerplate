import Icon from 'components/Icon';
import { useEffect, useState } from 'react';
import Select, { Option } from '../Select';
import Item from './Item';

const onLoadPageSize = (): Option[] => {
  const options: Option[] = [6, 10, 25, 50, 100].map((size) => ({
    label: size.toString(),
    value: size,
  }));

  return options;
};

const SIZE_OPTIONS = onLoadPageSize();

type Props = {
  current: number;
  currnetSize?: number;
  total: number;
  onChange: (attrs: Record<string, any>) => void;
  withChangeSize?: boolean;
  sizeLable?: string;
};

const Pagination: React.FC<Props> = ({
  current,
  currnetSize = 6,
  total,
  onChange,
  withChangeSize = true,
  sizeLable = 'Show',
}) => {
  const [nums, setNums] = useState<number[]>([]);

  useEffect(() => {
    const PAGINATIONS: number[] = [];

    for (let i = 1; i <= total; i++) {
      if (i >= current - 2 && i < current + 3) {
        PAGINATIONS.push(i);
      }
    }

    setNums(PAGINATIONS);
  }, [current, total]);

  const goToPage = (number: number) => {
    onChange({ page: number });
  };

  const onChangeSize = (number: number) => {
    onChange({ limit: number });
  };

  return (
    <div className="pagination">
      {withChangeSize && (
        <div className="pagination-size">
          <p className="pagination-size__label">{sizeLable}</p>
          <Select
            isFilterSearch={false}
            className="text-xs min-h-[1.8rem] !px-1 !py-0.5"
            value={currnetSize}
            onChange={(selected) =>
              onChangeSize(Array.isArray(selected) ? +selected[0] : +selected)
            }
            options={SIZE_OPTIONS}
          />
        </div>
      )}
      <div
        className={`pagination-container ${
          !withChangeSize ? 'justify-center' : ''
        }`}
      >
        {current > 1 && (
          <Item current={current} number={1} onClick={() => goToPage(1)}>
            <Icon icon={<>Prev</>} />
          </Item>
        )}
        {nums.map((number) => (
          <Item
            key={number}
            current={current}
            number={number}
            onClick={() => goToPage(number)}
          />
        ))}

        {total > 0 && current !== total && (
          <Item
            current={current}
            number={total}
            onClick={() => goToPage(total)}
          >
            <Icon icon={<>Next</>} />
          </Item>
        )}
      </div>
    </div>
  );
};

export default Pagination;
