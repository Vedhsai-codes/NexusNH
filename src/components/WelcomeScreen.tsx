// src/components/WelcomeScreen.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Stack, Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DirectionsBus, HealthAndSafety, LocalHospital, NightShelter } from '@mui/icons-material';

interface Props {
  lang: string;
  setLang: (lang: string) => void;
}

const WelcomeScreen: React.FC<Props> = ({ lang, setLang }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={4}>
        {/* App Name/Logo */}
        <Typography 
          variant="h3" 
          gutterBottom 
          color="primary"
          sx={{ 
            fontWeight: 700,
            mb: 1
          }}
        >
          NexusNH
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Nashua Health & Hope Navigator
        </Typography>

        {/* Main Action Buttons */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="primary"
            startIcon={<HealthAndSafety />}
            onClick={() => navigate('/mental-health')}
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            {t('mentalHealth')}
          </Button>
          
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="secondary"
            startIcon={<LocalHospital />}
            onClick={() => navigate('/substance-use')}
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            {t('substanceUse')}
          </Button>
          
          <Button
            variant="contained"
            size="large"
            fullWidth
            color="success"
            startIcon={<NightShelter />}
            onClick={() => navigate('/basic-needs')}
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            {t('basicNeedsT')}
          </Button>
        </Stack>

        {/* Transportation Quick Access */}
        <Paper 
          elevation={1}
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: 'primary.50',
            border: 1,
            borderColor: 'primary.100',
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'primary.100',
            }
          }}
          onClick={() => window.open('https://www.nashuanh.gov/456/Bus-Routes-Schedules', '_blank')}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DirectionsBus color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1" color="primary" fontWeight="medium">
              Check Nashua Transit Schedules
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Bus routes and timings
          </Typography>
        </Paper>

        {/* Legal Disclaimer */}
        <Paper 
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: 'grey.50',
            border: 1,
            borderColor: 'grey.300',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontStyle: 'italic',
              lineHeight: 1.4,
              display: 'block',
              textAlign: 'center'
            }}
          >
            This application provides informational resources only and is not a substitute for professional medical advice, diagnosis, or treatment. 
            In case of emergency, please call 911 or your local emergency services.
          </Typography>
          
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              mt: 1,
              display: 'block',
              textAlign: 'center'
            }}
          >
            All information is provided anonymously and no personal data is stored.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default WelcomeScreen;