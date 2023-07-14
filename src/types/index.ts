import { UniqueIdentifier } from '@dnd-kit/core';

export interface Todo {
    id: number;
    title: string;
    edit: boolean;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
    status: 'backlog' | 'inprogress' | 'done';
}

export interface Todos {
    todos: Todo[];
}

export const ItemTypes = {
    TODO: 'todo',
};

export interface TreeItem {
    id: UniqueIdentifier;
    children: TreeItem[];
    collapsed?: boolean;
}

export type TreeItems = TreeItem[];
