import { useState } from 'react';

function FieldConfigModal({ type, onSubmit, onClose }) {
    const [label, setLabel] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [optionSource, setOptionSource] = useState('manual'); // manual | api
    const [apiUrl, setApiUrl] = useState('');
    const [manualOptions, setManualOptions] = useState('');

    const handleSubmit = () => {
        let fieldData = {
            type,
            label
        };

        // Text input & textarea
        if (type === 'text' || type === 'textarea') {
            fieldData.placeholder = placeholder;
        }

        // Dropdown, checkbox, radio
        if (type === 'select' || type === 'checkbox' || type === 'radio') {
            if (optionSource === 'api') {
                fieldData.apiUrl = apiUrl;
                fieldData.options = []; // Will be fetched at runtime
            } else {
                fieldData.options = manualOptions
                    .split(',')
                    .map((opt) => {
                        const [text, value] = opt.split('|').map((o) => o.trim());
                        return { text, value: value || text };
                    });
            }
        }

        onSubmit(fieldData);
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{ backgroundColor: '#fff', padding: '20px', width: '400px' }}>
                <h3>Configure {type}</h3>

                {/* Label */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Label:</label>
                    <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>

                {/* Placeholder for text & textarea */}
                {(type === 'text' || type === 'textarea') && (
                    <div style={{ marginBottom: '10px' }}>
                        <label>Placeholder:</label>
                        <input
                            type="text"
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                )}

                {/* Options for select, checkbox, radio */}
                {(type === 'select' || type === 'checkbox' || type === 'radio') && (
                    <div>
                        <label>Options Source:</label>
                        <select
                            value={optionSource}
                            onChange={(e) => setOptionSource(e.target.value)}
                            style={{ width: '100%', marginBottom: '10px' }}
                        >
                            <option value="manual">Manual Entry</option>
                            <option value="api">API URL</option>
                        </select>

                        {optionSource === 'api' ? (
                            <div style={{ marginBottom: '10px' }}>
                                <label>API URL:</label>
                                <input
                                    type="text"
                                    value={apiUrl}
                                    onChange={(e) => setApiUrl(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ) : (
                            <div style={{ marginBottom: '10px' }}>
                                <label>Options (format: text|value, text|value):</label>
                                <input
                                    type="text"
                                    value={manualOptions}
                                    onChange={(e) => setManualOptions(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div style={{ textAlign: 'right' }}>
                    <button onClick={onClose} style={{ marginRight: '10px' }}>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: '#fff' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FieldConfigModal;
