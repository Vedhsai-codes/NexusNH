import React from 'react';
import { ResourceWithLive } from '../types/resource';
import { Box, Typography, Button, Divider } from '@mui/material';
import SMSHandler from './SMSHandler';
import en from '../i18n/en';
import es from '../i18n/es';

interface Props {
  resource: ResourceWithLive;
  onBack: () => void;
  lang: 'en' | 'es';
}

const ResourceDetail: React.FC<Props> = ({ resource, onBack, lang }) => {
  const t = lang === 'en' ? en : es;
  return (
    <Box p={2}>
      <Button onClick={onBack}>Back</Button>
      <Typography variant="h4" gutterBottom>
        {resource.name}
      </Typography>
      <Typography>Type: {resource.type}</Typography>
      <Typography>Address: {resource.address}</Typography>
      <Typography>Phone: {resource.phone}</Typography>
      <Typography>Hours: {resource.hours}</Typography>
      <Typography>Status: {resource.status}</Typography>
      {resource.capacity != null && <Typography>Capacity: {resource.capacity}</Typography>}
      {resource.notes && <Typography>Notes: {resource.notes}</Typography>}
      <Divider sx={{ my: 2 }} />
      {resource.live && (
        <>
          <Typography>Live Status:</Typography>
          <Typography>Available Beds: {resource.live.availableBeds ?? 'N/A'}</Typography>
          <Typography>Wait Time: {resource.live.waitTime ?? 'N/A'}</Typography>
          <Typography>Notes: {resource.live.specialNotes ?? '-'}</Typography>
          <Typography>Last Updated: {resource.live.updatedTimestamp}</Typography>
        </>
      )}
      <Box mt={3}>
        <SMSHandler serviceType={resource.type} lang={lang} />
      </Box>
    </Box>
  );
};

export default ResourceDetail;
