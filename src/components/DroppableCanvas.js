// DroppableCanvas.js
import { useDroppable } from '@dnd-kit/core';

function DroppableCanvas({ fields, removeField }) {
    const { setNodeRef } = useDroppable({ id: 'form-canvas' });

    return (
        <div
            ref={setNodeRef}
            style={{
                border: '2px dashed gray',
                padding: '20px',
                width: '400px',
                minHeight: '400px'
            }}
        >
            <h3>Form Canvas</h3>
            {fields.length === 0 && <p>Drag fields here</p>}
            {fields.map((field) => (
                <div
                    key={field.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                        position: 'relative'
                    }}
                >
                    <strong>{field.label}</strong>

                    {field.type === 'text' && (
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            style={{ width: '100%', marginTop: '5px' }}
                        />
                    )}

                    {field.type === 'textarea' && (
                        <textarea
                            placeholder={field.placeholder}
                            style={{ width: '100%', marginTop: '5px' }}
                            rows="4"
                        />
                    )}

                    {field.type === 'select' && (
                        <select style={{ width: '100%', marginTop: '5px' }}>
                            {field.options?.map((opt, idx) => (
                                <option key={idx} value={opt.value}>
                                    {opt.text}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === 'checkbox' && (
                        <div style={{ marginTop: '5px' }}>
                            {field.options?.map((opt, idx) => (
                                <label key={idx} style={{ display: 'block' }}>
                                    <input type="checkbox" value={opt.value} /> {opt.text}
                                </label>
                            ))}
                        </div>
                    )}

                    {field.type === 'radio' && (
                        <div style={{ marginTop: '5px' }}>
                            {field.options?.map((opt, idx) => (
                                <label key={idx} style={{ display: 'block' }}>
                                    <input type="radio" name={field.id} value={opt.value} /> {opt.text}
                                </label>
                            ))}
                        </div>
                    )}

                    <button
                        style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            border: 'none',
                            background: 'red',
                            color: '#fff',
                            cursor: 'pointer',
                            padding: '2px 6px'
                        }}
                        onClick={() => removeField(field.id)}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}

export default DroppableCanvas;
