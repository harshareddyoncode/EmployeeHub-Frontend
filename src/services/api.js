import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8001"

});

export const getEmployees = async () => {
    const response = await api.get("/employees");

    return response.data;
};

export const addEmployee = async (employeeData) => {
    const response = await api.post("/employees", employeeData);

    return response.data;
};

export const updateEmployee = async (employeeId, employeeData) => {
    const response = await api.put(
        `/employees/${employeeId}`,
        employeeData
    );

    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(
        `/employees/${id}`
    );
    
    return response.data;

};


export default api;