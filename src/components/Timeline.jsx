import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography, Box } from '@mui/material';
import FormModal from './FormModal'; // Asegúrate de tener este componente creado
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 
import WorkIcon from '@mui/icons-material/Work'; 
import '../App.css';

// Importar o definir otros formularios si los tienes
// import FormularioOAI from './FormularioOAI';
// import FormularioUnidadAcademica from './FormularioUnidadAcademica';
// import FormularioEscenarioPractica from './FormularioEscenarioPractica';

const CustomTimeline = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const today = new Date().toLocaleDateString();

  const items = [
    { 
      color: '#89d242', 
      title: 'Formulario de Postulación', 
      description: 'Envía los documentos listados en el paso 1 a la OAI, con 4 meses de antelación a la fecha de inicio solicitada.', 
      date: today, 
      icon: <PersonIcon style={{ cursor: 'pointer' }} onClick={() => openModal(0)} />, 
      username: 'Aspirante',
      formComponent: FormModal // Definir el formulario correspondiente
    },
    { 
      color: '#ec722e', 
      title: 'Formulario OAI', 
      description: 'Revisa que la documentación se encuentre completa y envía la postulación a la unidad académica.', 
      date: today, 
      icon: <PublicIcon style={{ cursor: 'pointer' }} onClick={() => openModal(1)} />, 
      username: 'Universidad del Valle OAI',
      formComponent: FormModal // Reemplaza con el componente correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Unidad Académica', 
      description: 'Revisa la disponibilidad de cupos y docente en el escenario de práctica solicitado. Envía notificación al escenario de práctica con copia a la OAI.', 
      date: today, 
      icon: <MenuBookIcon style={{ cursor: 'pointer' }} onClick={() => openModal(2)} />, 
      username: 'Universidad del Valle Unidad Académica',
      formComponent: FormModal // Reemplaza con el componente correspondiente
    },
    { 
      color: '#2ba5e7', 
      title: 'Escenario de Práctica', 
      description: 'La coordinación académica u oficina de educación del escenario de práctica, informa a la unidad academica con copia a la OAI la aceptación o rechazo de la solicitud del estudiante mediante acta / carta en un plazo máximo de 15 días.', 
      date: today, 
      icon: <WorkIcon style={{ cursor: 'pointer' }} onClick={() => openModal(3)} />, 
      username: 'Universidad del Valle, Escenario de Práctica',
      formComponent: FormModal // Reemplaza con el componente correspondiente
    }
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
              iconStyle={{ background: item.color, color: '#fff' }}
              icon={item.icon} 
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1, paddingRight: '10px', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                  <Typography variant="h6" component="h1">{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </Box>
              </Box>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        {items[currentForm]?.formComponent && React.createElement(items[currentForm].formComponent, {
          isOpen: modalIsOpen,
          onRequestClose: closeModal,
          formTitle: currentForm !== null ? items[currentForm].title : ''
        })}
      </Box>
    </Box>
  );
}

export default CustomTimeline;
