


function EmployeeForm({
  editingEmployee,
  setEditingEmployee,
  onUpdate,
  onCancel
}) {
  return (
    <div className="employee-form">
      <h2>Edit Employee</h2>

      <label>Name</label>
      <input
        type="text"
        value={editingEmployee.name}
        onChange={(e) =>
          setEditingEmployee({
            ...editingEmployee,
            name: e.target.value
          })
        }
      />

      <label>Age</label>
      <input
        type="number"
        value={editingEmployee.age}
        onChange={(e) =>
          setEditingEmployee({
            ...editingEmployee,
            age: Number(e.target.value)
          })
        }
      />

      <label>Department</label>
      <input
        type="text"
        value={editingEmployee.department}
        onChange={(e) =>
          setEditingEmployee({
            ...editingEmployee,
            department: e.target.value
          })
        }
      />

      <button onClick={onUpdate}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EmployeeForm;