import styled from "@emotion/styled";

const H1 = styled.h1`
  position: absolute;
  top: -140px;
  width: 100%;
  font-size: 80px;
  font-weight: 200;
  text-align: center;
  color: #b83f45;
`;
const BaseInput = styled.input`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.4);
  }
`;

const NewTodo = styled(BaseInput)`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  outline: 0;
  border: 0;

  &:focus {
    box-shadow: 0 0 2px 2px #cf7d7d;
  }
`;

export interface TodoHeaderProps {
  handleAddNewTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setNewTodo: (value: React.SetStateAction<string>) => void;
  newTodo: string;
}

const TodoHeader = ({
  handleAddNewTodo,
  setNewTodo,
  newTodo,
}: TodoHeaderProps) => {
  return (
    <div className="header">
      <H1>todos</H1>
      <NewTodo
        placeholder="What needs to be done?"
        autoFocus
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleAddNewTodo(event);
          }
        }}
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
    </div>
  );
};

export default TodoHeader;
