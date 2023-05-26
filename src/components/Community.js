import React, { useEffect, useState } from 'react';
import axios from 'axios';
import narutoIMG from '../img/naruto.png';
import HomeIcon from '@mui/icons-material/Home';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import {
  Accordion,
  Avatar,
  Button,
  Icon,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import './Design.css';
import AdminBoard from './AdminBoard';
import { useNavigate } from 'react-router-dom';
let selectedUsers = [];
export default function Community() {
  const [communityusers, setCommunityUsers] = useState([]);
  const [checkUsers, setCheckUsers] = useState([]);
  const [message, setMessage] = useState('');
  const history = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/community-users'); // Replace with your Flask API endpoint URL

        // Set the users data in the state
        const responseData = response.data.userData;
        console.log(responseData.length);
        if (responseData.length === 0) {
          console.log('no data');
        } else {
          setCommunityUsers(responseData);
          console.log('setUsers:', response.data.userData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
    console.log('users_length:', communityusers);
  });
  /* function to handle delete users */
  useEffect(() => {
    const count = checkUsers.length;
    console.log('count of users:', count, checkUsers);
  }, [checkUsers]);
  const handlechange = () => {
    history('/');
  };
  const handleCheckboxChange = (event, item) => {
    const itemId = item.user_id;
    console.log('users:', item);
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
  /* send data to delete to api-endpoint*/
  const handleAddToCommunity = () => {
    const sendData = async () => {
      try {
        const response = await fetch('/delete-users', {
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
      <div className="community-container">
        <div className="community-header">
          <Avatar alt="Image" src={narutoIMG} />
          <h1>Welcome to Naruto Community</h1>
        </div>
        <div className="community-userList">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="add-users-">Add Members</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{<AdminBoard />}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="delete-users-">Delete Members</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div>
                  {communityusers.length > 0 ? (
                    <div>
                      {communityusers.map((user) => (
                        <div key={user.user_id}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <input
                                    key={user.user_id}
                                    type="checkbox"
                                    checked={checkUsers.some(
                                      (item) => item.user_id === user.user_id
                                    )}
                                    onChange={(event) =>
                                      handleCheckboxChange(event, user)
                                    }
                                  />

                                  <span>{user.name}</span>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                          </Table>
                        </div>
                      ))}
                      <Button
                        className="addUser"
                        onClick={() => handleAddToCommunity()}
                      >
                        Delete Members
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h1>No Users to display</h1>
                    </div>
                  )}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="community-users">
          {' '}
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {communityusers.length > 0 ? (
                      <div>
                        <TableHead>
                          {communityusers.map((user) => (
                            <TableCell>
                              <div key={user.user_id}>
                                <Avatar
                                  alt={`Avatar`}
                                  src={user['Profile Pic']}
                                />
                                <span>{user.name}</span>
                              </div>
                            </TableCell>
                          ))}
                        </TableHead>
                      </div>
                    ) : (
                      <div>
                        <h1>No Users to display</h1>
                      </div>
                    )}{' '}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </div>{' '}
          <img src={narutoIMG} className="image"></img>
          <p>
            Naruto is a beloved and iconic character from the eponymous Japanese
            manga and anime series created by Masashi Kishimoto. He is a young
            ninja with big dreams and an indomitable spirit, known for his
            bright orange jumpsuit, spiky blond hair, and the prominent
            whisker-like marks on his face. Naruto's journey unfolds as he
            strives to become the Hokage, the strongest and most respected ninja
            in his village. Along the way, he faces numerous challenges,
            overcomes personal struggles, and forms lasting bonds with friends
            and allies.
          </p>
          <p>
            Joining the Naruto community offers a unique and immersive
            experience for fans and enthusiasts alike. This vibrant community
            celebrates the themes of friendship, determination, and never giving
            up, which resonate deeply with many. By joining the Naruto
            community, individuals can connect with fellow fans who share a
            passion for the series. Engaging in discussions, attending
            conventions, or participating in fan art and cosplay events can
            foster a sense of belonging and provide a platform to express
            creativity.
          </p>
          <Button
            variant="outlined"
            onClick={handlechange}
            className="home-button"
          >
            <HomeIcon />
            <span>Go back to Home</span>
          </Button>
        </div>
      </div>
    </>
  );
}
