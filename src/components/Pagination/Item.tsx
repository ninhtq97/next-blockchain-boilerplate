type Props = {
  current?: number;
  number?: number;
  onClick: () => void;
} & React.PropsWithChildren;

const Item: React.FC<Props> = ({ current, number, onClick, children }) => {
  return (
    <div
      className={`pagination__item ${
        current && number && current === number
          ? 'pagination__item--active'
          : ''
      }`}
      onClick={onClick}
    >
      <div className="pagination__inner">
        <p className="pagination__content">{children ?? number}</p>
      </div>
    </div>
  );
};

export default Item;
