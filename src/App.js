import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Make the API request when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/get-users'); // Replace with your Flask API endpoint URL

      // Set the users data in the state
      setUsers(response.data.userData);
      console.log('setUsers:', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <Card key={user._id.$oid} style={{ marginBottom: '10px' }}>
          <CardContent ls={{ maxWidth: 275 }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="#3399ff">{user.age}</Typography>
            <Typography color="#000080">{user.gender}</Typography>
            <Typography color="#008000">{user.skills}</Typography>
            <Typography color="#008000">{user.interest}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default App;
