// export type todoStatus = 'backlog' | 'inprogress' | 'complete';
export type priority = 'high' | 'medium' | 'low';

export enum todoStatus {
    backlog = 'backlog',
    inprogress = 'inprogress',
    complete = 'complete',
}

export interface Todo {
    id: string;
    title: string;
    edit: boolean;
    dueDate?: string;
    priority?: priority;
    completed?: boolean;
    status: todoStatus;
    parent?: null | string;
    depth: number;
    indentWidth?: number | undefined;
    collapsed?: boolean;
    collapsedItem?: boolean;
    date?: string | Date;
}

export type Todos = Todo[];
