import { useState, useEffect } from "react";

const EquipmentForm = ({ onSubmit, selected }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
    lastCleanedDate: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.status || !form.lastCleanedDate) {
      alert("All fields are required");
      return;
    }
    onSubmit(form);
    setForm({ name: "", type: "", status: "", lastCleanedDate: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="">Select Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        name="lastCleanedDate"
        value={form.lastCleanedDate?.substring(0,10)}
        onChange={handleChange}
      />

      <button type="submit">
        {selected ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default EquipmentForm;
