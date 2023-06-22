import React from 'react';

type Column = {
  id: number;
  title: string;
};
type columns = Column[];

const TodoColumn = () => {
  const columns: columns = [
    { id: 1, title: 'backlog' },
    { id: 2, title: 'in progress' },
    { id: 3, title: 'done' },
  ];
  return (
    <div>
      {columns.map(column => (
        <div className="column" key={column.id}>
          Item
        </div>
      ))}
    </div>
  );
};

export default TodoColumn;
