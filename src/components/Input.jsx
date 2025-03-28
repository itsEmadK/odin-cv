import '../styles/input.css';

export default function Input({
  value,
  onChange,
  label,
  required,
  type = 'text',
}) {
  return (
    <label>
      {label}
      {required && '*'}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
