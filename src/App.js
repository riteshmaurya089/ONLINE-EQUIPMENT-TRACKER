import { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";
import Pagination from "./components/Pagination";

import {
  fetchEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} from "./services/api";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [selected, setSelected] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    if (sortField === "lastCleanedDate") {
      return sortOrder === "asc"
        ? new Date(a.lastCleanedDate) - new Date(b.lastCleanedDate)
        : new Date(b.lastCleanedDate) - new Date(a.lastCleanedDate);
    }
    return sortOrder === "asc"
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedEquipment.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const loadData = async () => {
    const res = await fetchEquipment();
    setEquipment(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    if (selected) {
      await updateEquipment(selected._id, data);
      setSelected(null);
    } else {
      await addEquipment(data);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteEquipment(id);
    loadData();
  };

  return (
    <div className="app-container">
      <h1 className="title">Equipment Tracker</h1>

     

      {/* 🔹 Equipment Form */}
      <EquipmentForm onSubmit={handleSubmit} selected={selected} />

 {/* 🔍 Search + Sort */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by equipment name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="sort-select"
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="status">Status</option>
          <option value="lastCleanedDate">Last Cleaned</option>
        </select>

        <button
          className="sort-button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "⬆ Asc" : "⬇ Desc"}
        </button>
      </div>
      {/* 🔹 Equipment Table */}
      <EquipmentTable
        data={paginatedData}
        onEdit={setSelected}
        onDelete={handleDelete}
      />

      {/* 🔹 Pagination */}
      <Pagination
        total={filteredEquipment.length}
        perPage={itemsPerPage}
        current={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
