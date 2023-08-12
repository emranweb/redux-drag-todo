export type todoStatus = 'backlog' | 'inprogress' | 'complete';
export type priority = 'high' | 'medium' | 'low';

/**
 * @interface {};
 * @property id: string;
 * @property title: string;
 * @property edit: boolean;
 * @property dueDate?: string;
 * @property priority?: priority;
 * @property completed?: boolean;
 * @property status: todoStatus;
 * @property parent?: null | string;
 * @property depth: number;
 * @property indentWidth?: number | undefined;
 * @property collapsed?: boolean;
 * @property collapsedItem?: boolean;
 * @exports {@property}
 **/
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
 * @export {Todo []}
 * @property {Todo}
 * @interface Todo
 */

export type Todos = Todo[];
