import TodoItemType from "../types/TodoItem";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";

const ItemListTodo = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
export interface TodoListProps {
  filterTodos: TodoItemType[];
  handleUpdateStatus: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleCheckAll: (value: any) => void;
  handleUpdate: (id: string, value: string) => void;
}

const ToggleAll = styled.input`
  width: 1px;
  height: 1px;
  border: none;
`;

const ToggleLabel = styled.label`
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  transform: rotate(90deg);

  &:before {
    content: "❯";
    font-size: 22px;
    color: #e6e6e6;
    padding: 10px 27px 10px 27px;
  }
`;

const TodoList = ({
  filterTodos,
  handleUpdateStatus,
  handleDeleteTodo,
  handleCheckAll,
  handleUpdate,
}: TodoListProps) => {
  return (
    <div className="main">
      <ToggleAll
        id="toggle-all"
        type="checkbox"
        onChange={(e) => {
          handleCheckAll(e.target.checked);
        }}
      />
      <ToggleLabel htmlFor="toggle-all">Toggle all</ToggleLabel>
      <ItemListTodo>
        {filterTodos.map((todo) => (
          <TodoItem
            key={todo?.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdate={handleUpdate}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))}
      </ItemListTodo>
    </div>
  );
};

export default TodoList;
