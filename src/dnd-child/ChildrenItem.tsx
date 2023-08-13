// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { Handle } from './Handle';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { BiCollapseAlt } from 'react-icons/bi';

// interface ChildItemTypes extends ChildItem {
//     handleCollapse: (id: string) => void;
//     handleRemove: (id: string) => void;
// }

// const ChildrenItem = ({
//     id,
//     title,
//     indentWidth,
//     depth,
//     collapsed,
//     collapsedItem,
//     handleCollapse,
//     handleRemove,
// }: ChildItemTypes) => {
//     const {
//         isDragging,
//         transform,
//         attributes,
//         transition,
//         listeners,
//         setDraggableNodeRef,
//         setDroppableNodeRef,
//     } = useSortable({
//         id: id,
//     });

//     const style = { transform: CSS.Transform.toString(transform), transition };

//     const marginLeft = depth && indentWidth ? indentWidth * depth : 0;
//     return (
//         <div
//             className={`bg-primary text-white flex p-4  items-center w-1/2 mx-auto my-2 rounded-lg relative transition-all ${
//                 isDragging ? 'opacity-5' : 'opacity-100'
//             } ${collapsedItem ? 'hidden' : 'block'}  ${
//                 marginLeft ? 'left-[40px]' : ''
//             }`}
//             style={style}
//             ref={setDroppableNodeRef}
//         >
//             <div
//                 ref={setDraggableNodeRef}
//                 className="flex items-center justify-between w-full"
//             >
//                 {/* drag handler */}
//                 <Handle
//                     ref={setDraggableNodeRef}
//                     {...listeners}
//                     {...attributes}
//                 />
//                 {collapsed && (
//                     <span onClick={() => handleCollapse(id)}>
//                         <BiCollapseAlt />
//                     </span>
//                 )}
//                 {title}
//                 {/* {Item Remove } */}
//                 <span className="pointer" onClick={() => handleRemove(id)}>
//                     <AiOutlineCloseCircle />
//                 </span>
//             </div>
//         </div>
//     );
// };

// export default ChildrenItem;
