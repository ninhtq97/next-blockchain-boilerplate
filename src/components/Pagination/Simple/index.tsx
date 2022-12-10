import Icon from 'components/Icon';
import Item from '../Item';

type Props = {
  current: number;
  currentLength: number;
  total: number;
  size: number;
  onChange: (attrs: Record<string, unknown>) => void;
};

const SimplePagination: React.FC<Props> = ({
  current,
  currentLength,
  total,
  size,
  onChange,
}) => {
  const goToPage = (number: number) => {
    onChange({ cursor: number });
  };

  return (
    <div className="pagination simple">
      <div className="pagination-container">
        {current > 0 ? (
          <Item onClick={() => goToPage(current - size)}>
            <Icon icon={<></>} />
          </Item>
        ) : (
          <Item current={1} number={1} onClick={() => {}}>
            <Icon icon={<></>} />
          </Item>
        )}

        {currentLength > 0 && total >= size ? (
          <Item
            onClick={() =>
              goToPage(total < size ? total + size : current + size)
            }
          >
            <Icon icon={<></>} />
          </Item>
        ) : (
          <Item current={1} number={1} onClick={() => {}}>
            <Icon icon={<></>} />
          </Item>
        )}
      </div>
    </div>
  );
};

export default SimplePagination;
