// App.js
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import DraggableField from './components/DraggableField';
import DroppableCanvas from './components/DroppableCanvas';
import FieldConfigModal from './components/FieldConfigModal';
import { v4 as uuidv4 } from 'uuid';

const availableFields = [
  { id: 'text', label: 'Text Input', type: 'text' },
  { id: 'textarea', label: 'Textarea', type: 'textarea' },
  { id: 'select', label: 'Dropdown', type: 'select' },
  { id: 'checkbox', label: 'Checkbox', type: 'checkbox' },
  { id: 'radio', label: 'Radio Buttons', type: 'radio' }
];

function App() {
  const [droppedFields, setDroppedFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalFieldType, setModalFieldType] = useState(null);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && active) {
      const { type } = active.data.current;
      setModalFieldType(type);
      setShowModal(true);
    }
  };

  const handleModalSubmit = (configuredField) => {
    configuredField.id = uuidv4();
    setDroppedFields((prev) => [...prev, configuredField]);
    setShowModal(false);
  };

  const removeField = (id) => {
    setDroppedFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', padding: '20px', gap: '40px' }}>
        <div>
          <h3>Drag Fields</h3>
          {availableFields.map((field) => (
            <DraggableField key={field.id} {...field} />
          ))}
        </div>

        <DroppableCanvas
          fields={droppedFields}
          removeField={removeField}
        />

        {showModal && (
          <FieldConfigModal
            type={modalFieldType}
            onSubmit={handleModalSubmit}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </DndContext>
  );
}

export default App;
