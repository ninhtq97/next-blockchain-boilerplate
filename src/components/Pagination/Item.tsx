type Props = {
  current?: number;
  number?: number;
  onClick: () => void;
} & React.PropsWithChildren;

const Item: React.FC<Props> = ({ current, number, onClick, children }) => {
  return (
    <div
      className={`pagination-item ${
        current && number && current === number ? 'pagination-item--active' : ''
      }`}
      onClick={onClick}
    >
      <div className="pagination-item__inner">
        <p className="pagination-item__content">{children ?? number}</p>
      </div>
    </div>
  );
};

export default Item;
