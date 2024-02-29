import { useState } from "react";
import TodoItemType from "../types/TodoItem";
import { Input } from "./Input";
import styled from "@emotion/styled";

export interface TodoItemProps {
  todo: TodoItemType;
  handleDeleteTodo: (id: string) => void;
  handleUpdate: (id: string, title: string) => void;
  handleUpdateStatus: (id: string) => void;
}
const Item = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;

  & .show {
    padding-left: 10px;
  }

  &:last-child {
    border-bottom: none;
  }

  & .toggle {
    text-align: center;
    width: 40px;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
  }

  & .delete {
    display: none;
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
    transition: color 0.2s ease-out;

    &:hover {
      color: #af5b5e;
    }

    &:after {
      content: "×";
    }
  }

  &:hover .delete {
    display: block;
  }

  & label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
    font-weight: 400;
    color: #4d4d4d;
  }

  &.completed label {
    color: #cdcdcd;
    text-decoration: line-through;
  }
`;
const TodoItem = ({
  todo,
  handleDeleteTodo,
  handleUpdate,
  handleUpdateStatus,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const className = todo.status ? "completed" : "";

  return (
    <Item key={todo?.id} className={className}>
      {isEditing ? (
        <>
          <Input
            todo={todo}
            onSubmit={(id, title) => {
              handleUpdate(id, title);
              setIsEditing(false);
            }}
            defaultValue={todo?.value}
            onBlur={() => setIsEditing(false)}
          />
        </>
      ) : (
        <div className="show">
          <input
            className="toggle"
            type="checkbox"
            checked={todo?.status}
            onChange={() => handleUpdateStatus(todo?.id)}
          />
          <label
            onDoubleClick={() => {
              setIsEditing(true);
            }}
          >
            {todo?.value}
          </label>
          {
            <button
              className="delete"
              onClick={() => handleDeleteTodo(todo?.id)}
            ></button>
          }
        </div>
      )}
    </Item>
  );
};

export default TodoItem;
