import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import en from '../i18n/en';
import es from '../i18n/es';

interface Props {
  lang: 'en' | 'es';
}

const AdminPanel: React.FC<Props> = ({ lang }) => {
  const t = lang === 'en' ? en : es;
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const handleLogin = () => {
    const pw = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === pw) {
      setAuthorized(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!authorized) {
    return (
      <Box p={2}>
        <Typography variant="h5">Admin Login</Typography>
        <TextField
          label={lang === 'en' ? 'Password' : 'Contraseña'}
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleLogin}>
          {lang === 'en' ? 'Login' : 'Ingresar'}
        </Button>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5">Admin Panel</Typography>
      <Typography>Here you could add forms to update sheets via /api/admin-update</Typography>
    </Box>
  );
};

export default AdminPanel;
