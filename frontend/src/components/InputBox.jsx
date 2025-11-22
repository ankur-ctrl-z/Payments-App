const InputBox = ({ label, placeholder, name, value, onChange }) => {
  return (
    <div className="flex flex-col mb-3">
      <label>{label}</label>
      <input
        type="text"
        name={name}          // REQUIRED
        value={value}        // REQUIRED
        onChange={onChange}  // REQUIRED
        placeholder={placeholder}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
};

export default InputBox;


