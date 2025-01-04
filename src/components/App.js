import React, { useEffect, useState } from "react";
import axios from "axios";

const data = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
];

function FetchUsers() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(false); // State for loading status
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const fetchUsers = () => {
    setLoading(true); // Start loading
    setErrorMessage(""); // Clear any previous errors

    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        const fetchedUsers = response.data.data; // Get the user data from the response
        if (fetchedUsers.length > 0) {
          setUsers(fetchedUsers); // Update state with user data
        } else {
          setUsers([]);
          setErrorMessage("No users found.");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch users. Please try again later.");
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, [])

  return (
    <div className="fetch-users">
      <h1>Fetch Users</h1>
      <button className="btn" onClick={fetchUsers}>
        Get User List
      </button>
      {loading && <p>Loading...</p>} {/* Loading state */}
      {errorMessage && <p className="error">{errorMessage}</p>}{" "}
      {/* Error or empty list message */}
      {users.length === 0 && (
        <table>
          <tbody>
            <tr>
              <td>No data found to display.</td>
            </tr>
          </tbody>
        </table>
      )}
      {/* {users.length > 0 && !loading && ( */}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    width="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* )} */}
    </div>
  );
}

export default FetchUsers;
