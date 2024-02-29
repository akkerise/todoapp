import { useCallback } from "react";
import TodoItemType from "../types/TodoItem";
import styled from "@emotion/styled";

const InputDiv = styled.div`
  & .new-todo {
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: 0;
    border: 0;

    &:focus {
      box-shadow: 0 0 2px 2px #cf7d7d;
    }
  }
`;
export interface InputProps {
  onSubmit: (id: string, title: string) => void;
  defaultValue: string;
  onBlur: () => void;
  todo: TodoItemType;
}
export function Input({ onSubmit, defaultValue, onBlur, todo }: InputProps) {
  const handleKeyDown = useCallback(
    (e: any, id: string) => {
      if (e.key === "Enter") {
        const value = e?.target?.value.trim();
        onSubmit(id, value);
      }
    },
    [onSubmit]
  );

  return (
    <InputDiv className="input-container">
      <input
        className="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        autoFocus
        defaultValue={defaultValue}
        onBlur={() => onBlur()}
        onKeyDown={(e) => handleKeyDown(e, todo?.id)}
      />
    </InputDiv>
  );
}
