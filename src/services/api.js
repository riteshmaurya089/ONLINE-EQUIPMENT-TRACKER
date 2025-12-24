import axios from "axios";

const API = axios.create({
  baseURL: "https://equipment-tracker-backen.onrender.com/api",
});

export const fetchEquipment = () => API.get("/equipment");
export const addEquipment = (data) => API.post("/equipment", data);
export const updateEquipment = (id, data) =>
  API.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) =>
  API.delete(`/equipment/${id}`);
