import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { getNames } from 'country-list';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const loadingStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const countryOptions = Object.entries(getNames()).map(([code, name]) => ({
  value: code,
  label: name,
}));

const FormModal = ({ isOpen, onRequestClose, formTitle }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    sexo: '',
    estadoCivil: '',
    correo: '',
    telefono: '',
    direccion: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    fechaNacimiento: '',
    codigoEstudiante: '',
    periodoAcademico: '',
    tipoMovilidad: 'ENTRANTE',
    tipoConvenio: '',
    codigoConvenio: '',
    modalidad: '',
    numeroDiasMovilidad: '',
    tipoPrograma: '',
    nivelFormacionOrigen: '',
    nivelFormacionMovilidad: '',
    paisOrigen: '',
    universidadProcedencia: '',
    ciudadSede: '',
    paisDestino: 'COLOMBIA',
    universidadReceptora: 'UNIVERSIDAD DEL VALLE',
    ciudadSedeReceptora: 'CALI - SEDE SAN FERNANDO',
    programaOrigen: '',
    facultadOrigen: '',
    programaDestino1: '',
    codigoProgramaDestino1: '',
    programaDestino2: '',
    codigoProgramaDestino2: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openCaptchaErrorModal, setOpenCaptchaErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaValue) {
      setLoading(true);
      try {
        const response = await axios.post('https://movilidad-int-server.vercel.app/sendEntrantePregradoData', {
          insertData: Object.values(formData)
        });
        setLoading(false);
        if (response.status === 200) {
          setOpenSuccessModal(true);
        } else {
          setOpenErrorModal(true);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error al enviar los datos:', error);
        setOpenErrorModal(true);
      }
    } else {
      setOpenCaptchaErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    onRequestClose();
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleCloseCaptchaErrorModal = () => {
    setOpenCaptchaErrorModal(false);
  };

  return (
    <>
      {loading && (
        <div style={loadingStyle}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <Modal
        open={isOpen}
        onClose={onRequestClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {formTitle}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Sexo biológico</InputLabel>
              <Select
                label="Sexo biológico"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              >
                <MenuItem value="FEMENINO">FEMENINO</MenuItem>
                <MenuItem value="MASCULINO">MASCULINO</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Estado Civil</InputLabel>
              <Select
                label="Estado Civil"
                name="estadoCivil"
                value={formData.estadoCivil}
                onChange={handleChange}
              >
                <MenuItem value="SOLTERO/A">SOLTERO/A</MenuItem>
                <MenuItem value="CASADO">CASADO</MenuItem>
                <MenuItem value="DIVORCIADO">DIVORCIADO</MenuItem>
                <MenuItem value="UNIÓN LIBRE">UNIÓN LIBRE</MenuItem>
                <MenuItem value="VIUDO">VIUDO</MenuItem>
                <MenuItem value="SEPARADO">SEPARADO</MenuItem>
              </Select>
            </FormControl>
            
            <TextField fullWidth margin="normal" label="Correo electrónico" name="correo" type="email" value={formData.correo} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de identificación</InputLabel>
              <Select
                label="Tipo de identificación"
                name="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                onChange={handleChange}
              >
                <MenuItem value="PASAPORTE">PASAPORTE</MenuItem>
                <MenuItem value="CÉDULA">CÉDULA</MenuItem>
              </Select>
            </FormControl>
            
            <TextField fullWidth margin="normal" label="Número de identificación" name="numeroIdentificacion" value={formData.numeroIdentificacion} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} required />            
            <FormControl fullWidth margin="normal">
              <InputLabel>Periodo académico</InputLabel>
              <Select
                label="Periodo académico"
                name="periodoAcademico"
                value={formData.periodoAcademico}
                onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Modalidad</InputLabel>
              <Select
                label="Modalidad"
                name="modalidad"
                value={formData.modalidad}
                onChange={handleChange}
              >
                <MenuItem value="ASISTENCIA DE IDIOMAS">ASISTENCIA DE IDIOMAS</MenuItem>
                <MenuItem value="COTUTELA">COTUTELA</MenuItem>
                <MenuItem value="CURSO CORTO O CURSO DE VERANO">CURSO CORTO O CURSO DE VERANO</MenuItem>
                <MenuItem value="DOBLE TITULACIÓN MASTER 1">DOBLE TITULACIÓN MASTER 1</MenuItem>
                <MenuItem value="DOBLE TITULACIÓN MASTER 2">DOBLE TITULACIÓN MASTER 2</MenuItem>
                <MenuItem value="DOCTORAL">DOCTORAL</MenuItem>
                <MenuItem value="ESTANCIA DE INVESTIGACIÓN (POSGRADO)">ESTANCIA DE INVESTIGACIÓN (POSGRADO)</MenuItem>
                <MenuItem value="LECTOR">LECTOR</MenuItem>
                <MenuItem value="MISIÓN">MISIÓN</MenuItem>
                <MenuItem value="PRÁCTICA O PASANTÍA (POSGRADO)">PRÁCTICA O PASANTÍA (POSGRADO)</MenuItem>
                <MenuItem value="PRÁCTICA O PASANTÍA (PREGRADO)">PRÁCTICA O PASANTÍA (PREGRADO)</MenuItem>
                <MenuItem value="ROTACIÓN">ROTACIÓN</MenuItem>
                <MenuItem value="SEMESTRE DE INTERCAMBIO">SEMESTRE DE INTERCAMBIO</MenuItem>
                <MenuItem value="OTRA">OTRA</MenuItem>
              </Select>
            </FormControl>
            
            <TextField fullWidth margin="normal" label="Número Días Movilidad" name="numeroDiasMovilidad" type="number" value={formData.numeroDiasMovilidad} onChange={handleChange} required />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Programa - Convocatoria</InputLabel>
              <Select
                label="Tipo de Programa - Convocatoria"
                name="tipoPrograma"
                value={formData.tipoPrograma}
                onChange={handleChange}
              >
                <MenuItem value="BILATERAL">BILATERAL</MenuItem>
                <MenuItem value="AIESEC">AIESEC</MenuItem>
                <MenuItem value="ALIANZA DEL PACÍFICO">ALIANZA DEL PACÍFICO</MenuItem>
                <MenuItem value="AUIP">AUIP</MenuItem>
                <MenuItem value="BECA UCM">BECA UCM</MenuItem>
                <MenuItem value="BRACOL">BRACOL</MenuItem>
                <MenuItem value="CIAM">CIAM</MenuItem>
                <MenuItem value="CINDA">CINDA</MenuItem>
                <MenuItem value="COLCIENCIAS">COLCIENCIAS</MenuItem>
                <MenuItem value="COLFUTURO">COLFUTURO</MenuItem>
                <MenuItem value="CONACYT">CONACYT</MenuItem>
                <MenuItem value="CUNY">CUNY</MenuItem>
                <MenuItem value="DAAD">DAAD</MenuItem>
                <MenuItem value="ELAP">ELAP</MenuItem>
                <MenuItem value="EPFL">EPFL</MenuItem>
                <MenuItem value="ERASMUS">ERASMUS</MenuItem>
                <MenuItem value="FREE MOVER">FREE MOVER</MenuItem>
                <MenuItem value="FULBRIGHT">FULBRIGHT</MenuItem>
                <MenuItem value="FUNDACIÓN CAROLINA">FUNDACIÓN CAROLINA</MenuItem>
                <MenuItem value="HRK">HRK</MenuItem>
                <MenuItem value="IAESTE">IAESTE</MenuItem>
                <MenuItem value="ICETEX">ICETEX</MenuItem>
                <MenuItem value="JÓVENES INGENIEROS FRANCIA">JÓVENES INGENIEROS FRANCIA</MenuItem>
                <MenuItem value="MACA">MACA</MenuItem>
                <MenuItem value="MACMEX">MACMEX</MenuItem>
                <MenuItem value="MONBUSHO">MONBUSHO</MenuItem>
                <MenuItem value="OEA">OEA</MenuItem>
                <MenuItem value="PARIS 7">PARIS 7</MenuItem>
                <MenuItem value="PILA - ASCUN">PILA - ASCUN</MenuItem>
                <MenuItem value="SANTANDER">SANTANDER</MenuItem>
                <MenuItem value="SCIENCE PO">SCIENCE PO</MenuItem>
                <MenuItem value="SIN CONVENIO">SIN CONVENIO</MenuItem>
                <MenuItem value="SUSI">SUSI</MenuItem>
                <MenuItem value="TALCA">TALCA</MenuItem>
                <MenuItem value="UNAM">UNAM</MenuItem>
                <MenuItem value="UNIAIZU">UNIAIZU</MenuItem>
                <MenuItem value="UNIBREMEN">UNIBREMEN</MenuItem>
                <MenuItem value="UNIEXTREMADURA">UNIEXTREMADURA</MenuItem>
                <MenuItem value="UNITENRI">UNITENRI</MenuItem>
                <MenuItem value="UNIVIADRINA">UNIVIADRINA</MenuItem>
                <MenuItem value="USP">USP</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Nivel de Formación del estudiante de origen</InputLabel>
              <Select
                label="Nivel de Formación del estudiante de origen"
                name="nivelFormacionOrigen"
                value={formData.nivelFormacionOrigen}
                onChange={handleChange}
              >
                <MenuItem value="PREGRADO PROFESIONAL">PREGRADO PROFESIONAL</MenuItem>
                <MenuItem value="PREGRADO TECNOLÓGICO">PREGRADO TECNOLÓGICO</MenuItem>
                <MenuItem value="POSGRADO DOCTORADO">POSGRADO DOCTORADO</MenuItem>
                <MenuItem value="POSGRADO ESPECIALIZACIÓN CLÍNICO QUIRÚRGICA">POSGRADO ESPECIALIZACIÓN CLÍNICO QUIRÚRGICA</MenuItem>
                <MenuItem value="POSGRADO MAESTRÍA">POSGRADO MAESTRÍA</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Nivel de Formación de la movilidad</InputLabel>
              <Select
                label="Nivel de Formación de la movilidad"
                name="nivelFormacionMovilidad"
                value={formData.nivelFormacionMovilidad}
                onChange={handleChange}
              >
                <MenuItem value="PREGRADO">PREGRADO</MenuItem>
                <MenuItem value="POSGRADO">POSGRADO</MenuItem>
                <MenuItem value="OTRO">OTRO</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>País de Origen</InputLabel>
              <Select
                label="País de Origen"
                name="paisOrigen"
                value={formData.paisOrigen}
                onChange={handleChange}
              >
                {countryOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField fullWidth margin="normal" label="Universidad de procedencia" name="universidadProcedencia" value={formData.universidadProcedencia} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Ciudad-Sede Universidad de Procedencia" name="ciudadSede" value={formData.ciudadSede} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Programa académico de origen" name="programaOrigen" value={formData.programaOrigen} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Facultad del programa académico de origen" name="facultadOrigen" value={formData.facultadOrigen} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Programa académico de destino 1" name="programaDestino1" value={formData.programaDestino1} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Programa académico de destino 2" name="programaDestino2" value={formData.programaDestino2} onChange={handleChange} required />
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}  
                  onChange={handleCaptchaChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" fullWidth onClick={onRequestClose}>
                  Cerrar
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth type="submit">
                  Guardar cambios
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      
      <Dialog
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
      >
        <DialogTitle>Éxito</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Los datos se han enviado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={openErrorModal}
        onClose={handleCloseErrorModal}
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog
        open={openCaptchaErrorModal}
        onClose={handleCloseCaptchaErrorModal}
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, verifica que no eres un robot.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCaptchaErrorModal} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormModal;
