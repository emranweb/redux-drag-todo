import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Handle } from './Handle';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiCollapseAlt, BiMessageSquareEdit } from 'react-icons/bi';

interface ChildItemTypes {
    id: string;
    title: string;
    indentWidth: number;
    depth: number;
    collapsed: boolean | undefined;
    collapsedItem: boolean | undefined;
    handleCollapse: (id: string) => void;
    handleRemove: (id: string) => void;
    editTodo: (id: string) => void;
}

const ChildrenItem = ({
    id,
    title,
    indentWidth,
    depth,
    collapsed,
    collapsedItem,
    handleCollapse,
    handleRemove,
    editTodo,
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

    const marginLeft = depth && indentWidth ? indentWidth * depth : 0;
    return (
        <div
            className={`bg-primary  text-white flex p-4  items-center w-full  my-2 rounded-lg relative transition-all ${
                isDragging ? 'opacity-5' : 'opacity-100'
            } ${collapsedItem ? 'hidden' : 'block'}  ${
                marginLeft ? 'left-[40px]' : ''
            }`}
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
                    <div
                        className="absolute left-[20%]"
                        onClick={() => handleCollapse(id)}
                    >
                        <BiCollapseAlt />
                    </div>
                )}
                {title}
                <div
                    onClick={() => editTodo(id)}
                    className="absolute right-[10%]"
                >
                    <BiMessageSquareEdit />
                </div>
                {/* {Item Remove } */}
                <span className="pointer" onClick={() => handleRemove(id)}>
                    <AiOutlineCloseCircle />
                </span>
            </div>
        </div>
    );
};

export default ChildrenItem;
