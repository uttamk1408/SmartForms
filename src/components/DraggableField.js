import { useDraggable } from '@dnd-kit/core';

export default function DraggableField({ id, label, type }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { label, type },
    });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        cursor: 'grab'
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {label}
        </div>
    );
}
