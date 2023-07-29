import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Handle } from './Handle';

type ChildItemTypes = {
    id: string;
    title: string;
    collapsed?: boolean;
    indentWidth: number;
    depth: number;
    handleCollapse?: (id: string) => void;
};

const ChildrenItem = ({
    id,
    title,
    indentWidth,
    depth,
    handleCollapse,
}: ChildItemTypes) => {
    const { transform, attributes, setNodeRef, transition, listeners } =
        useSortable({
            id: id,
        });

    const style = { transform: CSS.Transform.toString(transform), transition };

    const marginLeft = depth ? indentWidth * depth : 0;
    return (
        <div
            className={`bg-red-100 flex items-center max-w-xs p-2 m-2 rounded-sm relative ${
                marginLeft ? 'left-[40px]' : ''
            }`}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
        >
            <Handle ref={setNodeRef} />
            {title}
            <button
                onClick={() => handleCollapse(id)}
                className="_2KKbCQhSKJyhMsrU01Xnm7 _3B4PJavUN0slKomrs7UBiy _1yuB6IonqthW0XDve0jXJ"
            >
                <svg
                    width="10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 70 41"
                >
                    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z"></path>
                </svg>
            </button>
        </div>
    );
};

export default ChildrenItem;
