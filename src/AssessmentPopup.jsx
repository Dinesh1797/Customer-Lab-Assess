import React, { useState } from 'react';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const SegmentPopup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState(['']);
  const [fieldName, setFieldName] = useState([])
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);

  const handleSchemaSelect = (e, index) => {
    const selectedSchema = e.target.value;
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = selectedSchema;
    setSelectedSchemas(newSchemas);
  };

  const handleAddNewSchema = () => {
    setSelectedSchemas([...selectedSchemas, '']);
    const abc = [...fieldName,[]]
        setFieldName(abc)
  };

  const handleSave = () => {
    const schema = selectedSchemas
      .filter(schema => schema)
      .map(schema => {
        const option = schemaOptions.find(option => option.value === schema);
        return option ? { [schema]: option.label } : null;
      })
      .filter(item => item !== null);

    const data = {
      segment_name: segmentName,
      schema,
    };

    console.log('Data to be sent to server:', data);

    // Sending data to the webhook URL
    fetch('https://webhook.site/f3f675e9-eb0f-49ec-a5aa-ad92d5546867', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Reset the form
    onClose();
    setSegmentName('');
    setSelectedSchemas(['']);
    setAvailableSchemas(schemaOptions);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Enter the Name of The Segment</h3>
        <input
          type="text"
          placeholder="Segment Name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
        <h4>To save your segment, You need to add the schemeas to build the query</h4>
        {selectedSchemas.map((schema, index) => (
          <select
            key={index}
            value={schema}
            onChange={(e) => handleSchemaSelect(e, index)}
          >
            
            <option value="" disabled>Select schema</option>
            
            {availableSchemas.map(option => (
              
              <option
                key={option.value}
                value={option.value}
                disabled={selectedSchemas.includes(option.value)}
              >
                {option.label}
              </option>
              
            ))}
          </select>
        ))}
        <button onClick={handleAddNewSchema}>+Add new schema</button>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SegmentPopup;
