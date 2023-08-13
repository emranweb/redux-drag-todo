// export type todoStatus = 'backlog' | 'inprogress' | 'complete';
export type priority = 'high' | 'medium' | 'low';

/**
 *
 *
 * @export
 * @enum {number}
 */
export enum todoStatus {
    backlog = 'backlog',
    inprogress = 'inprogress',
    complete = 'complete',
}

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
    date?: string | Date;
}

/**
 *
 *
 * @export {Todo []}
 * @property {Todo}
 * @interface Todo
 */

export type Todos = Todo[];
