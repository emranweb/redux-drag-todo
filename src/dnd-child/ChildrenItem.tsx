import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Handle } from './Handle';
import { AiOutlineCloseCircle } from 'react-icons/ai';

type ChildItemTypes = {
    id: string;
    title: string;
    collapsed?: boolean;
    indentWidth: number;
    depth: number;
    handleCollapse: (id: string) => void;
    handleRemove: (id: string) => void;
};

const ChildrenItem = ({
    id,
    title,
    indentWidth,
    depth,
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
            className={`bg-red-100 flex items-center max-w-xs p-2 m-2 rounded-sm relative ${
                isDragging ? 'opacity-5' : 'opacity-100'
            }  ${marginLeft ? 'left-[40px]' : ''}`}
            style={style}
            ref={setDroppableNodeRef}
        >
            <div
                ref={setDraggableNodeRef}
                className="flex items-center justify-between w-full"
            >
                {/* <span onClick={() => console.log('hi')}>Remove</span> */}
                <Handle
                    ref={setDraggableNodeRef}
                    {...listeners}
                    {...attributes}
                />
                {title}
                <span className="pointer" onClick={() => handleRemove(id)}>
                    <AiOutlineCloseCircle />
                </span>
            </div>
        </div>
    );
};

export default ChildrenItem;
