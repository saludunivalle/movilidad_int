import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { getNames } from 'country-list';

// Estilos para el modal principal
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

// Estilos para el indicador de carga
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

// Opciones de países obtenidas de una librería externa
const countryOptions = Object.entries(getNames()).map(([code, name]) => ({
  value: code,
  label: name,
}));

const FormModal = ({ isOpen, onRequestClose, formTitle }) => {
 // Estado inicial del formulario
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
    codigoProgramaDestino2: '',
    certificadoIdioma: null,
    cartaPresentacion: null,
    cartaMotivacion: null,
    diploma: null,
    certificadoCalificaciones: null,
    curriculumVitae: null,
    fotografia: null,
    pasaporte: null
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openCaptchaErrorModal, setOpenCaptchaErrorModal] = useState(false);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Maneja el cambio de valor del captcha
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Envía los datos del formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaValue) {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        const response = await axios.post('https://movilidad-int-server.vercel.app/sendEntrantePregradoData', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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


  // Cierra el modal de éxito y notifica cierre del formulario
  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    onRequestClose();
  };

  // Funciones para cerrar modales de error
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleCloseCaptchaErrorModal = () => {
    setOpenCaptchaErrorModal(false);
  };

  // Renderiza un input para subir archivos
  const renderFileInput = (label, name, description) => (
    <FormControl fullWidth margin="normal" sx={{justifyContent:'center'}}>
      <Typography variant="subtitle1" gutterBottom>{label}</Typography>
      <Typography variant="body2" color="textSecondary">{description}</Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ backgroundColor: 'primary', color: '#fff', mb: 1, width:'30%', alignSelf:'center', marginTop:'5px'}}
      >
        Subir {label}
        <input type="file" name={name} hidden onChange={handleChange} />
      </Button>
      {formData[name] && <Typography variant="body2">{formData[name].name}</Typography>}
    </FormControl>
  );

  return (
    <>
      {loading && (
        <div style={loadingStyle}>
          <CircularProgress color="inherit" />
        </div>
      )}

      {/* Modal del formulario */}
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

            {/* Campos adicionales para archivos */}
            <Typography variant="h6" component="h3">Documentos</Typography>
            {renderFileInput('Certificado de Idioma', 'certificadoIdioma', 'Certificado de idioma expedido por un instituto de idiomas oficial o documento emitido por la institución de origen, donde certifique el dominio del idioma español en habla, escritura y lectura, nivel B2. Aplica para estudiantes donde el idioma español no sea la lengua nativa.')}
            {renderFileInput('Carta de Presentación', 'cartaPresentacion', 'Carta de presentación emitida por la institución de origen (en hoja membretada y firmada), dirigida a la profesora Esther Cecilia Wilches Luna – Coordinadora de la Oficina de Asuntos Internacionales de la Facultad de Salud, especificando: nombre completo del estudiante, nombre de la movilidad a solicitar (Rotación clínica, pasantía, estancia de investigación o semestre de intercambio), área académica de interés y fechas exactas de inicio y finalización de la estancia.')}
            {renderFileInput('Carta de Motivación', 'cartaMotivacion', 'Carta de motivación donde especifique las razones por las que desea realizar la movilidad internacional en la Universidad del Valle, así como las áreas académicas de su interés (máximo una página).')}
            {renderFileInput('Diploma y Tarjeta Profesional', 'diploma', 'Diploma y tarjeta profesional (este último aplica para profesionales de la salud) expedida por el Ministerio de Salud o ente encargado en su país de origen.')}
            {renderFileInput('Certificado de Calificaciones', 'certificadoCalificaciones', 'Certificado de calificaciones actualizado a la fecha de solicitud. En caso que la institución de origen no emita calificaciones numéricas, deberá enviar carta de aprobación del año en curso.')}
            {renderFileInput('Curriculum Vitae', 'curriculumVitae', 'Curriculum Vitae / Hoja de vida (con fotografía).')}
            {renderFileInput('Fotografía', 'fotografia', 'Fotografía a color en fondo blanco formato jpg. De ser aceptada la solicitud, con esta fotografía le será tramitado el carné estudiantil.')}
            {renderFileInput('Pasaporte', 'pasaporte', 'Pasaporte donde se identifican los datos biográficos (vigente durante todo el periodo de movilidad). Los ciudadanos colombianos que estudian en el exterior, deberán adicionar la cédula de ciudadanía.')}

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                {/* Captcha */}
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}  
                  onChange={handleCaptchaChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth onClick={onRequestClose}>
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
