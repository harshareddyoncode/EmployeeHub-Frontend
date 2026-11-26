function AddEmployeeForm({
  newEmployee,
  setNewEmployee,
  onAdd,
  onCancel
}) {
  return (
    <div className="employee-form">
      <h2>Add New Employee</h2>

      <input
        type="text"
        placeholder="Employee Name"
        value={newEmployee.name}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            name: e.target.value
          })
        }
      />

      <input
        type="number"
         min="1"
        required
        onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e") {
            e.preventDefault();
        }
        }}
        placeholder="Employee Age"
        value={newEmployee.age}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            age: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Department"
        value={newEmployee.department}
        onChange={(e) =>
          setNewEmployee({
            ...newEmployee,
            department: e.target.value
          })
        }
      />

      <button onClick={onAdd}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default AddEmployeeForm;