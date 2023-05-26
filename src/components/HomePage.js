import React from 'react';
import AdminBoard from './AdminBoard';
import './Design.css';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Community from './Community';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Accordion, Typography } from '@mui/material';
import naruto from '../img/naruto.png';

export default function HomePage() {
  const history = useNavigate();
  const handleButtonClick = () => {
    history('/community');
  };
  return (
    <div className="container">
      <div className="header">Sample Community Website</div>
      <div className="userList">
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
      </div>

      <div className="users">
        <div className="home-content">
          <span>
            <h3>
              <img src={naruto} className="image" />

              <div>
                Naruto is a beloved and iconic character from the eponymous
                Japanese manga and anime series created by Masashi Kishimoto. He
                is a young ninja with big dreams and an indomitable spirit,
                known for his bright orange jumpsuit, spiky blond hair, and the
                prominent whisker-like marks on his face. Naruto's journey
                unfolds as he strives to become the Hokage, the strongest and
                most respected ninja in his village. Along the way, he faces
                numerous challenges, overcomes personal struggles, and forms
                lasting bonds with friends and allies.
              </div>
            </h3>
          </span>
          <div>
            <h3>Check out the naruto coummnity</h3>
            <h3>Or Add users to the community from the left navbar</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
