import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../types/index';

type TodosArray = Todo[];

const initialState: TodosArray = [
  {
    id: 1,
    title: 'Buy groceries',
    description: 'Milk, Bread, Eggs, and Fruits',
    dueDate: '2022-01-30',
    priority: 'high',
    completed: false,
  },
  {
    id: 2,
    title: 'Finish report',
    description: 'Complete the financial report for Q4',
    dueDate: '2022-01-25',
    priority: 'medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Call mom',
    description: "Catch up with mom and ask how she's doing",
    dueDate: '2022-01-22',
    priority: 'low',
    completed: false,
  },
  {
    id: 4,
    title: 'Schedule dentist appointment',
    description: 'Call the dentist and schedule a regular check-up',
    dueDate: '2022-02-10',
    priority: 'medium',
    completed: true,
  },
  {
    id: 5,
    title: 'Book flights for vacation',
    description: 'Find the best deals on flights for the summer vacation',
    dueDate: '2022-02-15',
    priority: 'low',
    completed: false,
  },
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
});

export default todosSlice.reducer;
