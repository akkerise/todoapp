import React, { useEffect, useState } from "react";
import TodoItemType from "./types/TodoItem";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import TodoHeader from "./components/TodoHeader";
import TodoFooter from "./components/TodoFooter";
import TodoList from "./components/TodoList";
import { z } from "zod";
import { FilterTodoType } from "./const/filterType";

const TodoAppContainer = styled.section`
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const getTodosFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("todos") as any) || [];

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(
    getTodosFromLocalStorage()
  );
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState(FilterTodoType.ALL);
  const todosType = {
    ACTIVE: todos?.filter((t) => !t.status),
    COMPLETED: todos?.filter((t) => t.status),
    ALL: todos,
  } as Record<string, TodoItemType[]>;

  const TodoItemSchema = z.object({
    id: z.string(),
    value: z.string(),
    status: z.boolean(),
  });

  const filterTodos = todosType[filter] || todos;
  const handleAddNewTodo = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const toDoItem = TodoItemSchema.parse({
      id: newTodo.length > 0 ? uuidv4() : uuidv4(),
      value: newTodo,
      status: false,
    });
    setTodos([...todos, toDoItem]);
    setNewTodo("");
  };

  const handleUpdateStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo?.id !== id
          ? todo
          : TodoItemSchema.parse({ ...todo, status: !todo?.status })
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos?.filter((todo) => todo?.id !== id));
  };

  const handleCheckAll = (value: any) => {
    if (value === true) {
      setTodos(
        todos.map((todo) => {
          return TodoItemSchema.parse({
            ...todo,
            status: true,
          });
        })
      );
    } else {
      setTodos(
        todos.map((todo) => {
          return TodoItemSchema.parse({
            ...todo,
            status: false,
          });
        })
      );
    }
  };
  const clearCompletedTodo = () => {
    setTodos(todos.filter((t) => !t.status));
  };

  const itemsLeft = todos.filter((t: TodoItemType) => !t.status).length;

  const handleUpdate = (id: string, value: string) => {
    const data = todos.map((todo) => {
      if (todo?.id === id) {
        return TodoItemSchema.parse({
          ...todo,
          value,
        });
      }
      return todo;
    });
    setTodos(data);
  };
  useEffect(() => {
    const stringifiedTodos = JSON.stringify(
      z.array(TodoItemSchema).parse(todos)
    );
    localStorage.setItem("todos", stringifiedTodos);
  }, [todos]);

  useEffect(() => {
    const stringifiedTodos = localStorage.getItem("todos");
    if (stringifiedTodos) {
      const todos = JSON.parse(stringifiedTodos);
      setTodos(z.array(TodoItemSchema).parse(todos));
    }
  }, []);
  return (
    <TodoAppContainer>
      <TodoHeader
        handleAddNewTodo={handleAddNewTodo}
        setNewTodo={setNewTodo}
        newTodo={newTodo}
      />
      <TodoList
        filterTodos={filterTodos}
        handleUpdateStatus={handleUpdateStatus}
        handleDeleteTodo={handleDeleteTodo}
        handleCheckAll={handleCheckAll}
        handleUpdate={handleUpdate}
      />
      <TodoFooter
        itemsLeft={itemsLeft}
        setFilter={setFilter}
        clearCompletedTodo={clearCompletedTodo}
        filter={filter}
      />
    </TodoAppContainer>
  );
};

export default App;
