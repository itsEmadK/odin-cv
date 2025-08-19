import { usePersonalDetails, usePersonalDetailsApi } from '../contexts/PersonalDetailsContext';
import '../styles/form.css';
import Input from './Input';

export default function PersonalDetailsForm() {
  const personalDetails = usePersonalDetails();
  const api = usePersonalDetailsApi();

  function handleNameChange(e) {
    api.updateName(e.target.value);
  }
  function handleEmailChange(e) {
    api.updateEmail(e.target.value);
  }
  function handlePhoneChange(e) {
    api.updatePhone(e.target.value);
  }
  function handleAddressChange(e) {
    api.updateAddress(e.target.value);
  }
  return (
    <form>
      <h2> Personal Details</h2>
      <Input
        label={'Full name'}
        value={personalDetails.name}
        onChange={handleNameChange}
        required={true}
      ></Input>
      <Input
        label={'Email'}
        value={personalDetails.email}
        onChange={handleEmailChange}
        required={false}
      ></Input>
      <Input
        label={'Phone Number'}
        value={personalDetails.phone}
        onChange={handlePhoneChange}
        required={false}
      ></Input>
      <Input
        label={'Address'}
        value={personalDetails.address}
        onChange={handleAddressChange}
        required={false}
      ></Input>
    </form>
  );
}
