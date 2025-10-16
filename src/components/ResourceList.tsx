import React, { useState } from 'react';
import { ResourceWithLive } from '../types/resource';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import en from '../i18n/en';
import es from '../i18n/es';

interface Props {
  resources: ResourceWithLive[];
  filterType: 'Mental Health' | 'Substance Use' | 'Basic Needs';
  onSelect: (resource: ResourceWithLive) => void;
  lang: 'en' | 'es';
}

const ResourceList: React.FC<Props> = ({ resources, filterType, onSelect, lang }) => {
  const t = lang === 'en' ? en : es;
  const [sortKey, setSortKey] = useState<'name' | 'availableBeds' | 'waitTime'>('name');

  const filtered = resources.filter(r => {
    if (filterType === 'Basic Needs') {
      return r.type === 'Shelter' || r.type === 'Integrated';
    }
    return r.type === filterType;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortKey === 'availableBeds') {
      const la = a.live?.availableBeds ?? 0;
      const lb = b.live?.availableBeds ?? 0;
      return lb - la;
    } else {
      return (a.live?.waitTime ?? '').localeCompare(b.live?.waitTime ?? '');
    }
  });

  return (
    <Box p={1} height="50vh" overflow="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">{filterType} Resources</Typography>
        <FormControl size="small">
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortKey}
            label="Sort by"
            onChange={e => setSortKey(e.target.value as any)}
          >
            <MenuItem value="name">{lang === 'en' ? 'Name' : 'Nombre'}</MenuItem>
            <MenuItem value="availableBeds">{lang === 'en' ? 'Beds' : 'Camas'}</MenuItem>
            <MenuItem value="waitTime">{lang === 'en' ? 'Wait Time' : 'Tiempo de espera'}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List>
        {sorted.map(r => (
          <React.Fragment key={r.id}>
            <ListItem button onClick={() => onSelect(r)}>
              <ListItemText
                primary={r.name}
                secondary={
                  <>
                    {r.status}
                    {r.live && ` — Beds: ${r.live.availableBeds ?? 'N/A'}, Wait: ${r.live.waitTime ?? 'N/A'}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ResourceList;
