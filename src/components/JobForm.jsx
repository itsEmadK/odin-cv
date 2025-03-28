import '../styles/form.css';
import Input from './Input';

export default function JobForm({
  formInfo,
  onSubmit,
  onChange,
  onDelete,
  onCancel,
}) {
  function handleCompanyChange(e) {
    onChange({ ...formInfo, company: e.target.value });
  }
  function handleRoleChange(e) {
    onChange({ ...formInfo, role: e.target.value });
  }
  function handleStartDateChange(e) {
    onChange({ ...formInfo, startDate: new Date(e.target.value) });
  }
  function handleEndDateChange(e) {
    onChange({ ...formInfo, endDate: new Date(e.target.value) });
  }
  function handleLocationChange(e) {
    onChange({ ...formInfo, location: e.target.value });
  }
  function handleDescriptionChange(e) {
    onChange({ ...formInfo, description: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        value={formInfo.company}
        label={'Company'}
        required={true}
        onChange={handleCompanyChange}
      ></Input>
      <Input
        value={formInfo.role}
        label={'Role'}
        required={true}
        onChange={handleRoleChange}
      ></Input>
      <Input
        value={!!formInfo.startDate && formInfo.startDate.toISOString().split('T')[0]}
        label={'Start Date'}
        required={true}
        type="date"
        onChange={handleStartDateChange}
      ></Input>
      <Input
        value={!!formInfo.endDate && formInfo.endDate.toISOString().split('T')[0]}
        label={'End Date'}
        required={false}
        type="date"
        onChange={handleEndDateChange}
      ></Input>
      <Input
        value={formInfo.location}
        label={'Location'}
        required={false}
        onChange={handleLocationChange}
      ></Input>
      <label>
        Description
        <textarea
          className="job-desc"
          value={formInfo.description}
          onChange={handleDescriptionChange}
        />
      </label>

      <div className="buttons-container">
        {formInfo && (
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
