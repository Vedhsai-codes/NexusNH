import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Props {
  lang: string;
  onSelect: (lang: string) => void;
}

const LanguageToggle: React.FC<Props> = ({ lang, onSelect }) => {
  return (
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel id="lang-select-label">Language</InputLabel>
      <Select
        labelId="lang-select-label"
        value={lang}
        label="Language"
        onChange={(e) => onSelect(e.target.value as string)}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageToggle;
