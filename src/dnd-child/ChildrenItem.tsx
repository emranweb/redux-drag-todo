import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Handle } from './Handle';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type ChildItemTypes = {
    id: string;
    title: string;
    collapsed?: boolean;
    indentWidth: number;
    depth: number;
    collapsedItem?: boolean;
    handleCollapse: (id: string) => void;
    handleRemove: (id: string) => void;
};

const ChildrenItem = ({
    id,
    title,
    indentWidth,
    depth,
    collapsed,
    collapsedItem,
    handleCollapse,
    handleRemove,
}: ChildItemTypes) => {
    const {
        isDragging,
        transform,
        attributes,
        transition,
        listeners,
        setDraggableNodeRef,
        setDroppableNodeRef,
    } = useSortable({
        id: id,
    });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const marginLeft = depth ? indentWidth * depth : 0;
    return (
        <div
            className={`bg-red-100 flex items-center max-w-xs p-2 m-2 rounded-sm relative transition-all ${
                isDragging ? 'opacity-5' : 'opacity-100'
            } ${
                collapsedItem
                    ? 'opacity-0 invisible p-0 m-0 h-0'
                    : 'opacity-1 visible h-100'
            }  ${marginLeft ? 'left-[40px]' : ''}`}
            style={style}
            ref={setDroppableNodeRef}
        >
            <div
                ref={setDraggableNodeRef}
                className="flex items-center justify-between w-full"
            >
                {/* drag handler */}
                <Handle
                    ref={setDraggableNodeRef}
                    {...listeners}
                    {...attributes}
                />
                {collapsed && (
                    <span onClick={() => handleCollapse(id)}>Collapse</span>
                )}
                {title}
                {/* {Item Remove } */}
                <span className="pointer" onClick={() => handleRemove(id)}>
                    <AiOutlineCloseCircle />
                </span>
            </div>
        </div>
    );
};

export default ChildrenItem;
