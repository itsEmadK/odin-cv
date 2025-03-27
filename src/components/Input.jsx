import '../styles/input.css';

export default function Input({ value, onChange, label, required }) {
  return (
    <label>
      {label}
      {required && '*'}
      <input type="text" value={value} onChange={onChange} required={required} />
    </label>
  );
}
