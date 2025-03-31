type Props = {
  name: string;
  entryWord: string;
};

const GameEntry: React.FC<Props> = (prop) => {
  return (
    <div>
      <h1>{prop.name}</h1>
    </div>
  );
};

export default GameEntry;
