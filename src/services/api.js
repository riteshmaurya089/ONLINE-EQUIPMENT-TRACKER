import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL ,
});

export const fetchEquipment = () => API.get("/equipment");
export const addEquipment = (data) => API.post("/equipment", data);
export const updateEquipment = (id, data) => API.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);
