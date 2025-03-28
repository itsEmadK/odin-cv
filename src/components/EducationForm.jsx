import '../styles/form.css';
import Input from './Input';

export default function EducationForm({
  formInfo,
  onSubmit,
  onChange,
  onDelete,
  onCancel,
}) {
  function handleUniversityChange(e) {
    onChange({ ...formInfo, university: e.target.value });
  }
  function handleFieldChange(e) {
    onChange({ ...formInfo, field: e.target.value });
  }
  function handleStartDateChange(e) {
    onChange({ ...formInfo, startDate: new Date(e.target.value) });
  }
  function handleEndDateChange(e) {
    onChange({ ...formInfo, endDate: new Date(e.target.value) });
  }
  function handleLocationChange(e) {
    onChange({ ...formInfo, city: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Input
        value={formInfo.university}
        label={'University'}
        required={true}
        onChange={handleUniversityChange}
      ></Input>
      <Input
        value={formInfo.field}
        label={'Field'}
        required={true}
        onChange={handleFieldChange}
      ></Input>
      <Input
        value={
          !!formInfo.startDate &&
          formInfo.startDate.toISOString().split('T')[0]
        }
        label={'Start Date'}
        required={true}
        type="date"
        onChange={handleStartDateChange}
      ></Input>
      <Input
        value={
          !!formInfo.endDate &&
          formInfo.endDate.toISOString().split('T')[0]
        }
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
