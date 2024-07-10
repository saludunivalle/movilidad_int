import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Typography, Box } from '@mui/material';
import FormModal from './FormModal'; 
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import MenuBookIcon from '@mui/icons-material/MenuBook'; 
import WorkIcon from '@mui/icons-material/Work'; 
import '../App.css';
import BadgeImage from '../assets/images/insignia.png'; 
import BadgeImage2 from '../assets/images/insignia2.png';

const CustomTimeline = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const today = new Date().toLocaleDateString();

  const items = [
    { 
      color: '#ec722e', 
      title: 'Formulario de Postulación', 
      description: 'Envía los documentos listados en el paso 1 a la OAI, con 4 meses de antelación a la fecha de inicio solicitada.', 
      date: today, 
      icon: <PersonIcon />, 
      username: 'Aspirante',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Revisa que la documentación se encuentre completa y envía la postulación a la unidad académica.', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#89d242', 
      title: 'Unidad Académica', 
      description: 'Revisa la disponibilidad de cupos y docente en el escenario de práctica solicitado. Envía notificación al escenario de práctica con copia a la OAI.', 
      icon: <MenuBookIcon />, 
      username: 'Universidad del Valle - Unidad Académica',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#2ba5e7', 
      title: 'Escenario de Práctica', 
      description: 'La coordinación académica u oficina de educación del escenario de práctica, informa a la unidad academica con copia a la OAI la aceptación o rechazo de la solicitud del estudiante mediante acta / carta en un plazo máximo de 15 días.', 
      icon: <WorkIcon />, 
      username: 'Universidad del Valle - Escenario de Práctica',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#89d242', 
      title: 'Unidad Académica', 
      description: 'Envía la carta de aceptación a la OAI, en un plazo máximo de 15 días, detallando la información de la rotación, cronograma de actividades y nombre completo del docente responsable.', 
      icon: <MenuBookIcon />, 
      username: 'Universidad del Valle - Unidad Académica',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Envía la carta de aceptación al estudiante y demás información relacionada con la movilidad internacional.', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#ec722e', 
      title: 'Formulario Estudiante', 
      description: 'Envía: seguro médico internacional, vacunas, laboratorios y certificado de RCP* con 1 mes de antelación a la fecha de inicio de la rotación. * Sólo para estudiantes de posgrados clínicos. ', 
      icon: <PersonIcon />, 
      username: 'Aspirante',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Revisa que la documentación se encuentre completa.', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Bienvenida del estudiante a la Facultad de Salud de la Universidad del Valle.', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal, // Para el formulario correspondiente
      badge: BadgeImage 
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Coordina con el equipo de comunicaciones de la Facultad de Salud la entrevista de finalización de la movilidad internacional con diligenciamiento de la encuesta de satisfacción. ', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#89d242', 
      title: 'Unidad Académica', 
      description: 'Envía la constancia de calificación y/o movilidad a la OAI, en un plazo máximo de 15 días después de culminada la movilidad internacional. ', 
      icon: <MenuBookIcon />, 
      username: 'Universidad del Valle - Unidad Académica',
      formComponent: FormModal // Para el formulario correspondiente
    },
    { 
      color: '#de3dbc', 
      title: 'Formulario OAI', 
      description: 'Envía la constancia de calificación y/o movilidad al estudiante con copia a la unidad académica. ', 
      icon: <PublicIcon />, 
      username: 'Universidad del Valle - OAI',
      formComponent: FormModal, // Para el formulario correspondiente
      badge: BadgeImage2
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
              date={
                <>
                  <span>{item.date}</span><br /><br />  
                  <span>{item.username}</span><br />  
                  <Box sx={{ display: 'flex', justifyContent: index % 2 === 0 ? 'left' : 'right', alignItems: 'center', paddingLeft: '30px' }}>
                    {item.badge && (
                      <img 
                        src={item.badge} 
                        alt="Insignia" 
                        style={{ width: '100px', height: '100px' }} 
                      />
                    )}
                  </Box>
                </>
              }
              iconStyle={{ background: item.color, color: '#fff', cursor: 'pointer' }}
              icon={
                <div className="timeline-icon-container" onClick={() => openModal(index)}>
                  {item.icon}
                </div>
              }
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(index)}
              >
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
