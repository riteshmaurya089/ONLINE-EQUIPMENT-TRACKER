const EquipmentTable = ({ data, onEdit, onDelete }) => {
  return (
    <table className="equipment-table">
      <thead>
        <tr>
          <th className="name-column">Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((eq) => (
          <tr key={eq._id}>
            {/* 🔥 Name column fix */}
            <td className="name-column" title={eq.name}>
              {eq.name}
            </td>

            <td>{eq.type}</td>
            <td>{eq.status}</td>
            <td>{eq.lastCleanedDate.substring(0, 10)}</td>
            <td>
              <button onClick={() => onEdit(eq)}>Edit</button>
              <button onClick={() => onDelete(eq._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;
