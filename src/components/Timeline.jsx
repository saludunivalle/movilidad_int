import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography, Box } from '@mui/material';
import FormModal from './FormModal';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 
import '../App.css';

const CustomTimeline = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const today = new Date().toLocaleDateString(); 

  const items = [
    { title: 'Formulario Entrante', description: 'Description 1', date: today, username: 'User' },
    { title: 'Title 2', description: 'Description 2', date: today, username: 'User' },
    { title: 'Title 3', description: 'Description 3', date: today, username: 'User' },
    { title: 'Title 4', description: 'Description 4', date: today, username: 'User' },
    { title: 'Title 5', description: 'Description 5', date: today, username: 'User' },
  ];

  const openModal = (formIndex) => {
    setCurrentForm(formIndex);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '80%' }}>
        <VerticalTimeline className="custom-timeline">
          {items.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              date={<><span>{item.date}</span><br /><br /><span>{item.username}</span></>}
              iconStyle={{ background: 'rgba(235,30,0,255)', color: '#fff' }}
              icon={<MenuBookIcon onClick={() => openModal(index)} style={{ cursor: 'pointer' }} />} 
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, paddingRight: '10px', textAlign: 'right' }}>
                  <Typography variant="h6" component="h1">{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </Box>
              </Box>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        <FormModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          formTitle={currentForm !== null ? items[currentForm].title : ''}
        />
      </Box>
    </Box>
  );
}

export default CustomTimeline;
