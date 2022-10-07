export type HeadCell = {
  id: string;
  label: string | React.ReactNode;
  align: 'left' | 'center' | 'right';
};

type Props = {
  columns: HeadCell[];
} & React.HTMLAttributes<HTMLElement>;

const Table: React.FC<Props> = ({ className, columns, children }) => {
  return (
    <div className="tbl-wrapper">
      <table className={`tbl${className ? ` ${className}` : ''}`}>
        <thead>
          <tr>
            {columns.map((e, i) => (
              <th align={e.align} key={e.id || i}>
                e.label
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
