import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';
import communityPage from './communityHandler';
let selectedUsers = [];

export default function AdminBoard() {
  const [users, setUsers] = useState([]);
  const [checkUsers, setCheckUsers] = useState([]);
  useEffect(() => {
    // Make the API request when the component mounts

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/get-users'); // Replace with your Flask API endpoint URL

        // Set the users data in the state
        setUsers(response.data.userData);
        console.log('setUsers:', response.data.userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const count = checkUsers.length;
    console.log('count of users:', count, checkUsers);
  }, [checkUsers]);

  const handleCheckboxChange = (event, item) => {
    const itemId = item._id.$oid;
    console.log('users:', item._id.$oid);

    const checkedEvent = event.target.checked;
    if (checkedEvent) {
      setCheckUsers([...checkUsers, item]);
      selectedUsers.push(item);
      console.log('checked state:', checkUsers);
      console.log('selected Users:', selectedUsers);
    } else {
      console.log('user_id:', itemId);
      var updatedUsers = checkUsers.filter((i) => i._id.$oid !== itemId);
      console.log('updated Users:', updatedUsers);
      setCheckUsers(updatedUsers);
      const updateSelectedUsers = checkUsers.filter(
        (user) => user._id.$oid !== itemId
      );
      selectedUsers = updateSelectedUsers;
      console.log('after removal array:', selectedUsers);
    }
  };
  const handleAddToCommunity = () => {
    communityPage(selectedUsers);
    setCheckUsers([]);
  };
  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user._id.$oid}>
            <input
              type="checkbox"
              checked={checkUsers.some(
                (item) => item._id.$oid === user._id.$oid
              )}
              onChange={(event) => handleCheckboxChange(event, user)}
            />
            <div>
              <span>{user.name}</span>
            </div>
            <div>
              <span>{user._id.$oid}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          <Button className="addUser" onClick={() => handleAddToCommunity()}>
            Add to Community
          </Button>
        </div>
      </div>
    </>
  );
}
