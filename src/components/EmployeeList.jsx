// import { useState } from "react";

// import "./EmployeeList.css";

// function EmployeeList({ employees, onDelete, onEdit }) {

//     const [search, setSearch] = useState("");


//   const filteredEmployees = employees.filter((employee) =>
//     employee.name.toLowerCase().includes(search.toLowerCase())
// );

//   return (
//     <div className="employee-list">

//       <h2>Employee Management</h2>

//       <input
//       className="search-input"
//       type="text"
//       placeholder="Search employees..."
//       value={search}
//       onChange={(e) => setSearch(e.target.value)} />

//       <table className="employee-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Department</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {filteredEmployees.length > 0 ? (
//             filteredEmployees.map((employee) => (
              
//             <tr key={employee.id}>
//             <td>{employee.id}</td>
//             <td>{employee.name}</td>
//             <td>{employee.age}</td>
//             <td>{employee.department}</td>
//             <td>
                

//                <button
//               className="edit-btn"
//               onClick={() => onEdit(employee)}
//               >
//               Edit
//             </button>

//               <button
//               className="delete-btn"
//               onClick={() => onDelete(employee.id)}
//               >
//               Delete
//               </button>
//             </td>
//             </tr>
//         ))      
//         ) : (
//         <tr>
//         <td colSpan="5">
//             No employees found
//         </td>
//         </tr>
//         )}
//           {/* {filteredEmployees.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.id}</td>
//               <td>{employee.name}</td>
//               <td>{employee.age}</td>
//               <td>{employee.department}</td>
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>

//     </div>
//   );
// }

// export default EmployeeList;






import { useState } from "react";
import "./EmployeeList.css";

function EmployeeList({ employees, onDelete, onEdit }) {
    const [search, setSearch] = useState("");

    // const filteredEmployees = employees.filter((employee) =>
    //     employee.name.toLowerCase().includes(search.toLowerCase())
    // );

    const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.department.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className="employee-list">

            <h2>Employee Management</h2>

            <p>Total Employees: {filteredEmployees.length}</p>

            {/* <input
                className="search-input"
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            /> */}

            <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
            className="clear-search-btn"
            onClick={() => setSearch("")}
            >
            Clear
            </button>
            </div>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => {
                            console.log(
                                "Employee ID:",
                                employee._id,
                                "Name:",
                                employee.name
                            );

                            return (
                                <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.age}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => onEdit(employee)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => onDelete(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default EmployeeList;
