import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface TreeItem {
    id: UniqueIdentifier;
    children: TreeItem[];
    collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
    parentId: UniqueIdentifier | null;
    depth: number;
    index: number;
}

export type SensorContext = MutableRefObject<{
    items: FlattenedItem[];
    offset: number;
}>;

export interface TodoItem {
    id: string;
    title: string;
    parant: null | string;
    depth: number;
    collapsed: boolean;
}

export type TodoItems = TodoItem[];
