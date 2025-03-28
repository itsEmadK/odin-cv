import { useState } from 'react';
import '../styles/form.css';
import Input from './Input';

export default function EducationForm({
  education,
  onSubmit,
  onDelete,
  onCancel,
}) {
  const [university, setUniversity] = useState(
    education ? education.university : ''
  );
  const [field, setField] = useState(education ? education.field : '');
  const [startDate, setStartDate] = useState(
    education ? education.startDate : ''
  );
  const [endDate, setEndDate] = useState(
    education && education.endDate ? education.endDate : ''
  );
  const [location, setLocation] = useState(
    education ? education.city : ''
  );

  function handleUniversityChange(e) {
    setUniversity(e.target.value);
  }
  function handleFieldChange(e) {
    setField(e.target.value);
  }
  function handleStartDateChange(e) {
    setStartDate(new Date(e.target.value));
  }
  function handleEndDateChange(e) {
    setEndDate(new Date(e.target.value));
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({ university, field, startDate, endDate, city: location });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        value={university}
        label={'University'}
        required={true}
        onChange={handleUniversityChange}
      ></Input>
      <Input
        value={field}
        label={'Field'}
        required={true}
        onChange={handleFieldChange}
      ></Input>
      <Input
        value={!!startDate && startDate.toISOString().split('T')[0]}
        label={'Start Date'}
        required={true}
        type="date"
        onChange={handleStartDateChange}
      ></Input>
      <Input
        value={!!endDate && endDate.toISOString().split('T')[0]}
        label={'End Date'}
        required={false}
        type="date"
        onChange={handleEndDateChange}
      ></Input>
      <Input
        value={location}
        label={'Location'}
        required={false}
        onChange={handleLocationChange}
      ></Input>

      <div className="buttons-container">
        {education && (
          <button onClick={onDelete} className="delete" type="button">
            Delete
          </button>
        )}
        <button onClick={onCancel} className="cancel" type="Cancel">
          Cancel
        </button>
        <button className="save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
