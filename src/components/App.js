import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchUsers() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(false); // State for loading status
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const fetchUsers = () => {
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear any previous errors

    axios
      .get('https://reqres.in/api/users')
      .then((response) => {
        const fetchedUsers = response.data.data; // Get the user data from the response
        if (fetchedUsers.length > 0) {
          setUsers(fetchedUsers); // Update state with user data
        } else {
          setUsers([]);
          setErrorMessage('No users found.');
        }
      })
      .catch((error) => {
        setErrorMessage('Failed to fetch users. Please try again later.');
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="fetch-users">
      <h1>Fetch Users</h1>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>

      {loading && <p>Loading...</p>} {/* Loading state */}

      {errorMessage && <p className="error">{errorMessage}</p>} {/* Error or empty list message */}

      {users.length > 0 && !loading && (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} width="50" />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FetchUsers;
