import '../styles/form.css';
import Input from './Input';

export default function PersonalDetailsForm(person, onChange) {
  function handleNameChange(e) {
    onChange({ ...person, name: e.target.value });
  }
  function handleEmailChange(e) {
    onChange({ ...person, email: e.target.value });
  }
  function handlePhoneChange(e) {
    onChange({ ...person, phone: e.target.value });
  }
  function handleAddressChange(e) {
    onChange({ ...person, address: e.target.value });
  }
  return (
    <form>
      <h2> Personal Details</h2>
      <Input
        label={'Full name'}
        value={person.name}
        onChange={handleNameChange}
        required={true}
      ></Input>
      <Input
        label={'Email'}
        value={person.email}
        onChange={handleEmailChange}
        required={false}
      ></Input>
      <Input
        label={'Phone Number'}
        value={person.phone}
        onChange={handlePhoneChange}
        required={false}
      ></Input>
      <Input
        label={'Address'}
        value={person.address}
        onChange={handleAddressChange}
        required={false}
      ></Input>
    </form>
  );
}
