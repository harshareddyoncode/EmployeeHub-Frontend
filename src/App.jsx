import './App.css';

import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import AddEmployeeForm from './components/AddEmployeeForm';

import { useState, useEffect } from "react";



import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from './services/api';

function App() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const [message, setMessage] = useState("");
const [messageType, setMessageType] = useState("");

useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
        setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
}, [message]);


useEffect(() => {

  const loadEmployees = async () => {
    try {

      // await new Promise(resolve => setTimeout(resolve, 3000));
      const data = await getEmployees();

      setEmployees(data);

    } 
    catch (err) {
    console.error("Error fetching employees:", err);
    setError("Failed to load employees. Please try again.");
}

    finally {
            setLoading(false);
        }


  };

  loadEmployees();

}, []);

const [editingEmployee, setEditingEmployee] = useState(null);


const [showAddForm, setShowAddForm] = useState(false);

const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    department: ""
});


// const handleDeleteEmployee = (id) => {
//     setEmployees((prevEmployees) =>
//         prevEmployees.filter((employee) => employee._id !== id)
//     );
// };

const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
};


// const handleUpdateEmployee = () => {
//     setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
          
//             employee._id === editingEmployee._id
//                 ? editingEmployee
//                 : employee
//         )
//     );

//     setEditingEmployee(null);
// };

const handleUpdateEmployee = async () => {
    await updateEmployee(
        editingEmployee._id,
        editingEmployee
    );

    const data = await getEmployees();
    setEmployees(data);

    setEditingEmployee(null);
};


const handleDeleteEmployee = async (id) => {

  if (!window.confirm("Are you sure you want to delete this employee?")) {
    return;
}
    try {
        await deleteEmployee(id);

        const data = await getEmployees();
        setEmployees(data);

        // alert("Employee deleted successfully");
        setMessage("Employee deleted successfully");
        setMessageType("success");

        
    } catch (error) {
        console.error("Error deleting employee:", error);
        // alert("Failed to delete employee");
         setMessage("Failed to delete employee");
    setMessageType("error");
    }
};

// const handleUpdateEmployee = () => {

//     console.log("EDITING EMPLOYEE:", editingEmployee);

//     setEmployees((prevEmployees) => {

//         console.log("CURRENT EMPLOYEES:", prevEmployees);

//         const updatedEmployees = prevEmployees.map((employee) => {

//             console.log(
//                 "Comparing:",
//                 employee._id,
//                 editingEmployee._id
//             );

//             return employee._id === editingEmployee._id
//                 ? editingEmployee
//                 : employee;
//         });

//         console.log("UPDATED EMPLOYEES:", updatedEmployees);

//         return updatedEmployees;
//     });

//     setEditingEmployee(null);
// };




const handleAddEmployee = async () => {
  if (
    !newEmployee.name.trim() ||
    !newEmployee.age ||
    !newEmployee.department.trim()
  )
  //  {
  //   alert("Please fill in all fields");
  //   return;
  // }
  {
    setMessage("Please fill in all fields");
    setMessageType("error");
    return;
}

  
  if (Number(newEmployee.age) <= 0) {
    setMessage("Age must be greater than zero");
    setMessageType("error");
    return;
}

  try {
    await addEmployee({
      name: newEmployee.name,
      age: Number(newEmployee.age),
      department: newEmployee.department
    });

    const data = await getEmployees();

    setEmployees(data);

    setNewEmployee({
      name: "",
      age: "",
      department: ""
    });

    setShowAddForm(false);

    // alert("Employee added successfully");
    setMessage("Employee added successfully");
    setMessageType("success");

  } catch (error) {
    console.error("Error adding employee:", error);
    // alert("Failed to add employee");

      setMessage("Failed to add employee");
    setMessageType("error");
  }
};




  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>EmployeeHub</h2>

        <nav>
          <p className="active">Dashboard</p>
          <p>Employees</p>
          <p>Departments</p>
          <p>Attendance</p>
          <p>Leave Management</p>
          <p>Settings</p>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="main-content">

        {/* Top Navigation */}

      <header className="topbar">

      <h2>Dashboard</h2>

      <div className="topbar-right">
      <input type="text" placeholder="Search..." />

      <div className="admin-profile">
      <div className="admin-avatar">A</div>
      <span>Admin</span>
      </div>
      </div>

      </header>

        {/* Dashboard Content */}
        <section className="dashboard-content">

      <h1>Overview</h1>

    <p>Welcome to your Employee Management System.</p>

    <div className="dashboard-cards">

    <div className="card">
    <h3>Total Employees</h3>
    <h2>120</h2>
    </div>

  <div className="card">
    <h3>Active Employees</h3>
    <h2>110</h2>
  </div>

  <div className="card">
    <h3>Departments</h3>
    <h2>8</h2>
  </div>

  <div className="card">
    <h3>On Leave</h3>
    <h2>10</h2>
  </div>

    </div>

      </section>


    {editingEmployee && (
    <EmployeeForm
    editingEmployee={editingEmployee}
    setEditingEmployee={setEditingEmployee}
    onUpdate={handleUpdateEmployee}
    onCancel={() => setEditingEmployee(null)} />
    )}



        <button 
        className="add-btn"
        onClick={() => setShowAddForm(true)}>
        Add Employee
      </button>
       

    {showAddForm && (
      <AddEmployeeForm
      newEmployee={newEmployee}
      setNewEmployee={setNewEmployee}
      onAdd={handleAddEmployee}
      onCancel={() => {
        setShowAddForm(false);
        setNewEmployee({
          name: "",
          age: "",
          department: ""
          });
      }}
      />
    )}

    
    {message && (
    <div className={`notification ${messageType}`}>
        {message}
    </div>
)}

    {loading ? (
    <p>Loading employees...</p>
    ) : error ? (
    <p>{error}</p>
    ) : (
    <EmployeeList
        employees={employees}
        onDelete={handleDeleteEmployee}
        onEdit={handleEditEmployee}
    />
      )}




    <div className="recent-employees">

  <h2>Recent Employees</h2>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Age</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>1</td>
        <td>Harsha</td>
        <td>IT</td>
        <td>23</td>
        <td>Active</td>
      </tr>

      <tr>
        <td>2</td>
        <td>Ramu</td>
        <td>IT</td>
        <td>26</td>
        <td>Active</td>
      </tr>

      <tr>
        <td>3</td>
        <td>Rahul</td>
        <td>HR</td>
        <td>24</td>
        <td>Active</td>
      </tr>

      <tr>
        <td>4</td>
        <td>Rekha</td>
        <td>Sales</td>
        <td>29</td>
        <td>Active</td>
      </tr>
    </tbody>
  </table>

</div>
   </main>
    </div>
  );
}

export default App;