type Props = {
  count: number;
  children?: React.ReactNode;
};

export default function Test({ count }: Props) {
  return <div>{count}</div>;
}



export const Test2: React.FC<Props> = ({ children }) => {
  return <div>
    <h1>test 2 component</h1>
    <p>children: </p>

    <div>
      {children}
    </div>
  </div>;
}

