import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TriageQuestionnaire from './TriageQuestionnaire';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  lang: string;
}

const MentalHealthScreen: React.FC<Props> = ({ lang }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleComplete = (result: { level: string }) => {
    console.log('Triage result:', result);
    navigate('/triage-result', { state: result });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={6} textAlign="center">
        <Typography variant="h5" gutterBottom>
          {t('mentalHealthTitle')}
        </Typography>
        <TriageQuestionnaire onComplete={handleComplete} />
      </Box>
    </Container>
  );
};

export default MentalHealthScreen;
