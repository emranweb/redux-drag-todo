import { UniqueIdentifier } from '@dnd-kit/core';

export type todoStatus = 'backlog' | 'inprogress' | 'complete';
export type priority = 'high' | 'medium' | 'low';

/**
 *
 *
 * @export
 * @interface Todo
 */
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
}

/**
 *
 *
 * @export
 * @property {Todo}
 * @interface Todos
 */

export type Todos = Todo[];
