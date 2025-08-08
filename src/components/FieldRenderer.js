export default function FieldRenderer({ field }) {
    switch (field.type) {
        case 'text':
            return <input placeholder={field.label} style={{ display: 'block', marginBottom: '10px' }} />;
        case 'select':
            return (
                <select style={{ display: 'block', marginBottom: '10px' }}>
                    {field.options?.map((opt, idx) => (
                        <option key={idx} value={opt.value}>{opt.text}</option>
                    ))}
                </select>
            );
        case 'checkbox':
            return (
                <div style={{ display: 'block', marginBottom: '10px' }}>
                    <div>{field.label}</div>
                    {field.options?.map((opt, idx) => (
                        <label key={idx} style={{ marginRight: '10px' }}>
                            <input type="checkbox" value={opt.value} /> {opt.text}
                        </label>
                    ))}
                </div>
            );
        default:
            return null;
    }
}
