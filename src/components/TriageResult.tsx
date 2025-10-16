// src/components/TriageResult.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CrisisAlert, Schedule, SelfImprovement, Phone } from '@mui/icons-material';
import { TriageResult } from './TriageQuestionnaire';
import { useTranslation } from 'react-i18next';
import SelfHelpResources from './SelfHelpResources'; // Add this import

interface TriageResultProps {
  result: TriageResult;
  onReset: () => void;
}

const TriageResultDisplay: React.FC<TriageResultProps> = ({ result, onReset }) => {
  const { t } = useTranslation();

  const getIcon = (level: string) => {
    switch (level) {
      case 'talk-now': return <CrisisAlert color="error" />;
      case 'next-48h': return <Schedule color="warning" />;
      case 'self-help': return <SelfImprovement color="success" />;
      default: return <SelfImprovement />;
    }
  };

  const getSeverity = (level: string) => {
    switch (level) {
      case 'talk-now': return 'error';
      case 'next-48h': return 'warning';
      case 'self-help': return 'success';
      default: return 'info';
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {getIcon(result.level)}
          <Typography variant="h5" fontWeight="bold" sx={{ ml: 2 }}>
            {result.title}
          </Typography>
        </Box>

        <Alert severity={getSeverity(result.level)} sx={{ mb: 3 }}>
          {result.description}
        </Alert>

        {/* Recommended Actions */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t('phq2.recommendedSteps')}
        </Typography>
        <List dense>
          {result.actions.map((action, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <SelfImprovement color="primary" />
              </ListItemIcon>
              <ListItemText primary={action} />
            </ListItem>
          ))}
        </List>

        {/* Resources */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          {t('phq2.resources')}
        </Typography>
        <List dense>
          {result.resources.map((resource, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText primary={resource} />
            </ListItem>
          ))}
        </List>

        {/* Self-Help Resources Section - Only show for self-help level */}
        {result.level === 'self-help' && (
          <Box sx={{ mt: 3 }}>
            <SelfHelpResources />
          </Box>
        )}

        {/* Immediate Crisis Help */}
        {result.level === 'talk-now' && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'error.light', borderRadius: 1 }}>
            <Typography variant="h6" color="white" gutterBottom>
              {t('phq2.immediateHelp')}
            </Typography>
            <Button 
              variant="contained" 
              color="error"
              fullWidth
              href="tel:988"
              startIcon={<Phone />}
              sx={{ mb: 1 }}
            >
              {t('phq2.call988')}
            </Button>
            <Button 
              variant="outlined" 
              color="inherit"
              fullWidth
              href="sms:741741"
              startIcon={<Phone />}
            >
              {t('phq2.textHome')}
            </Button>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={onReset}
          >
            {t('phq2.startNew')}
          </Button>
          <Button 
            variant="outlined"
            onClick={() => window.history.back()}
          >
            {t('phq2.backToResources')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TriageResultDisplay;