import { useState } from 'react';
import '../styles/form.css';
import Input from './Input';

export default function JobForm({ job, onSubmit, onDelete, onCancel }) {
  const [company, setCompany] = useState(job ? job.company : '');
  const [role, setRole] = useState(job ? job.role : '');
  const [startDate, setStartDate] = useState(job ? job.startDate : '');
  const [endDate, setEndDate] = useState(
    job && job.endDate ? job.endDate : ''
  );
  const [location, setLocation] = useState(job ? job.location : '');
  const [description, setDescription] = useState(
    job ? job.description : ''
  );

  function handleCompanyChange(e) {
    setCompany(e.target.value);
  }
  function handleRoleChange(e) {
    setRole(e.target.value);
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

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit({
      company,
      role,
      startDate,
      endDate,
      location,
      description,
    });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        value={company}
        label={'Company'}
        required={true}
        onChange={handleCompanyChange}
      ></Input>
      <Input
        value={role}
        label={'Role'}
        required={true}
        onChange={handleRoleChange}
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
      <label>
        Description
        <textarea
          className="job-desc"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>

      <div className="buttons-container">
        {job && (
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
