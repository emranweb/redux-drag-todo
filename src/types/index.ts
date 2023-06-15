export interface Todo {
  id: number;
  title: string;
  edit: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface Todos {
  todos: Todo[];
}

export const ItemTypes = {
  TODO: 'todo',
};
