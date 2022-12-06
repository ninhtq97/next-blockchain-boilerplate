type Props = { name: string } & React.HTMLAttributes<HTMLElement>;

const NestedLayout: React.FC<Props> = ({ className, name, children }) => {
  return (
    <div className={`${name}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
};

export default NestedLayout;
