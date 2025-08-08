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

  const generateHTMLForm = () => {
    const html = `
    <form>
      ${droppedFields.map(field => {
      if (field.type === 'text') {
        return `<label>${field.label || ''}</label><input type="text" name="${field.name || ''}" />`;
      }
      if (field.type === 'select') {
        return `
            <label>${field.label || ''}</label>
            <select name="${field.name || ''}">
              ${(field.options || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          `;
      }
      if (field.type === 'checkbox') {
        return `<label><input type="checkbox" name="${field.name || ''}" /> ${field.label || ''}</label>`;
      }
      if (field.type === 'radio') {
        return `
            <label>${field.label || ''}</label>
            ${(field.options || []).map(opt => `<label><input type="radio" name="${field.name || ''}" value="${opt}" /> ${opt}</label>`).join('')}
          `;
      }
      if (field.type === 'textarea') {
        return `<label>${field.label || ''}</label><textarea name="${field.name || ''}"></textarea>`;
      }
      return '';
    }).join('<br/>')}
    </form>
  `;

    // Download HTML file
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form.html';
    link.click();
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

      <div style={{ marginTop: '20px' }}>
        <button onClick={generateHTMLForm}>Create Form</button>
      </div>
    </DndContext>
  );
}

export default App;
