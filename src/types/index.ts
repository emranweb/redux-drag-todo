import { UniqueIdentifier } from '@dnd-kit/core';

// export type todoStatus = 'backlog' | 'inprogress' | 'complete';
export type Priority = 'high' | 'medium' | 'low';

export enum TodoStatus {
    backlog = 'backlog',
    inprogress = 'inprogress',
    complete = 'complete',
}

export interface Todo {
    id: string;
    title: string;
    edit: boolean;
    dueDate?: string;
    priority?: Priority;
    completed?: boolean;
    status: TodoStatus;
    parent?: null | string | UniqueIdentifier;
    depth: number;
    indentWidth?: number | undefined;
    collapsed?: boolean;
    collapsedItem?: boolean;
    date?: string | Date;
}

export type Todos = Todo[];
