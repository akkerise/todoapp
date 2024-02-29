import styled from "@emotion/styled";
import { FilterTodoType } from "../const/filterType";

export interface TodoFooterProps {
  itemsLeft: number;
  setFilter: React.Dispatch<React.SetStateAction<FilterTodoType>>;
  clearCompletedTodo: () => void;
  filter: FilterTodoType
}
const TodoLeft = styled.span`
  float: left;
  text-align: left;

  strong {
    font-weight: 300;
  }
`;
const Footer = styled.footer`
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;

  &::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
`;

const FilterNav = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
`;
const Filter = styled.li`
  display: inline;
`;
const FilterItem = styled.a`
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  &.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
`;

const ClearCompletedButton = styled.button`
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &[type="button"] {
    &[disabled] {
      cursor: default;
      opacity: 0.5;
    }
  }
`;

const TodoFooter = ({
  itemsLeft,
  setFilter,
  clearCompletedTodo,
  filter
}: TodoFooterProps) => {

  return (
    <Footer>
      <TodoLeft>
        <strong>{itemsLeft}</strong> item{itemsLeft !== 1 && "s"} left
      </TodoLeft>
      <FilterNav>
        <Filter>
          <FilterItem 
          className={filter === FilterTodoType.ALL ? "selected":""}
          onClick={() => setFilter(FilterTodoType.ALL)}
          >
            All
          </FilterItem>
        </Filter>
        <Filter>
          <FilterItem 
          className={filter === FilterTodoType.ACTIVE ? "selected":""}
          onClick={() => setFilter(FilterTodoType.ACTIVE)}
          >
            Active
          </FilterItem>
        </Filter>
        <Filter>
          <FilterItem 
          className={filter === FilterTodoType.COMPLETED ? "selected":""}
          onClick={() => setFilter(FilterTodoType.COMPLETED)}
          >
            Completed
          </FilterItem>
        </Filter>
      </FilterNav>
      {
        <ClearCompletedButton
          onClick={() => {
            clearCompletedTodo();
            setFilter(FilterTodoType.ALL);
          }}
        >
          Clear completed
        </ClearCompletedButton>
      }
    </Footer>
  );
};
export default TodoFooter;
