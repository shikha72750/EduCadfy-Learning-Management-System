import DashboardLayout from "../layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/services";

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
try {
  const res = await getAllUsers();
  console.log("Users API Response:", res); // res is already { success, code, message, result }
  setUsers(res.result); // ← yahan result array
} catch (err) {
  console.log("Error fetching users:", err);
}
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h2 className="mb-3 text-light">Registered Users</h2>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Users;