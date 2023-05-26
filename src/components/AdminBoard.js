import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router-dom';

import {
  Alert,
  Accordion,
  Avatar,
  Button,
  Card,
  CardContent,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import communityPage from './communityHandler';

let selectedUsers = [];

export default function AdminBoard() {
  const [users, setUsers] = useState([]);
  const [checkUsers, setCheckUsers] = useState([]);
  const history = useNavigate();
  const [message, setMessage] = useState('');
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
  useEffect(() => {
    if (message === 'success') {
      console.log('inside useEffect:', message);
      history('/community');
    }
  }, [message]);
  const handleCheckboxChange = (event, item) => {
    const itemId = item.user_id;
    console.log('users:', itemId);

    const checkedEvent = event.target.checked;
    if (checkedEvent) {
      setCheckUsers([...checkUsers, item]);
      selectedUsers.push(item);
      console.log('checked state:', checkUsers);
      console.log('selected Users:', selectedUsers);
    } else {
      console.log('user_id:', itemId);
      var updatedUsers = checkUsers.filter((i) => i.user_id !== itemId);
      console.log('updated Users:', updatedUsers);
      setCheckUsers(updatedUsers);
      const updateSelectedUsers = checkUsers.filter(
        (user) => user.user_id !== itemId
      );
      selectedUsers = updateSelectedUsers;
      console.log('after removal array:', selectedUsers);
    }
  };
  const handleAddToCommunity = () => {
    communityPage(selectedUsers);

    const sendData = async () => {
      try {
        const response = await fetch('/add-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedUsers),
        });
        const responseData = await response.json();
        console.log('responseData.message:', responseData.message);
        setMessage(responseData.message);
        if (response.ok) {
          console.log('data sent success:');
        } else {
          console.log('failed to send data:');
        }
      } catch (error) {
        console.log('error:', error);
      }
    };
    sendData();

    setCheckUsers([]);
    selectedUsers = [];
    console.log('message', message);
    if (message === 'success') {
      console.log('inside if:', message);
      history('/community');
    }
    //
  };
  return (
    <>
      <div className="add-user-nav">
        <Table>
          {users.map((user) => (
            <TableRow>
              <TableCell>
                <input
                  key={user.user_id}
                  type="checkbox"
                  checked={checkUsers.some(
                    (item) => item.user_id === user.user_id
                  )}
                  onChange={(event) => handleCheckboxChange(event, user)}
                />
                <label>{user.name}</label>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        <Button className="addUser" onClick={() => handleAddToCommunity()}>
          Add to Community
        </Button>
      </div>
    </>
  );
}
