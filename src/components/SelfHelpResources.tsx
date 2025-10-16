// src/components/SelfHelpResources.tsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import {
  ExpandMore,
  SelfImprovement,
  Article,
  Groups,
  Spa,
  FitnessCenter,
  Psychology,
  Link as LinkIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SelfHelpResources: React.FC = () => {
  const { t } = useTranslation();

  const copingStrategies = t('phq2.results.selfHelp.copingStrategies.techniques', { returnObjects: true }) as string[];
  const dailyPractices = t('phq2.results.selfHelp.dailyPractices.practices', { returnObjects: true }) as string[];

  const onlineResources = [
    {
      name: "Mental Health America",
      description: "Screening tools and educational resources",
      url: "https://www.mhanational.org",
      category: "Education"
    },
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "Support groups and crisis resources", 
      url: "https://www.nami.org",
      category: "Support"
    },
    {
      name: "Mindful.org",
      description: "Meditation and mindfulness guides",
      url: "https://www.mindful.org",
      category: "Mindfulness"
    },
    {
      name: "Crisis Text Line",
      description: "Free 24/7 text support",
      url: "https://www.crisistextline.org",
      category: "Crisis"
    }
  ];

  const localResources = [
    {
      name: "Greater Nashua Mental Health",
      description: "Sliding scale counseling and support groups",
      phone: "(603) 889-6147",
      type: "Counseling"
    },
    {
      name: "The Youth Council", 
      description: "Youth and family counseling services",
      phone: "(603) 889-1090",
      type: "Youth Services"
    },
    {
      name: "Nashua Public Library",
      description: "Mental health books and quiet spaces",
      phone: "(603) 589-4600", 
      type: "Community"
    }
  ];

  return (
    <Box sx={{ mt: 3 }}>
      {/* Coping Strategies */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {t('phq2.results.selfHelp.copingStrategies.title')}
          </Typography>
          <List dense>
            {copingStrategies.map((technique, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Spa color="primary" />
                </ListItemIcon>
                <ListItemText primary={technique} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Daily Practices */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            {t('phq2.results.selfHelp.dailyPractices.title')}
          </Typography>
          <List dense>
            {dailyPractices.map((practice, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FitnessCenter color="primary" />
                </ListItemIcon>
                <ListItemText primary={practice} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Online Resources */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Article sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6">Online Mental Health Resources</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {onlineResources.map((resource, index) => (
              <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {resource.name}
                  </Typography>
                  <Chip label={resource.category} size="small" sx={{ ml: 1 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {resource.description}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LinkIcon />}
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  Visit Website
                </Button>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Local Nashua Resources */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Groups sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6">Local Nashua Resources</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {localResources.map((resource, index) => (
              <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {resource.name}
                  </Typography>
                  <Chip label={resource.type} size="small" sx={{ ml: 1 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {resource.description}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => window.open(`tel:${resource.phone}`)}
                >
                  Call {resource.phone}
                </Button>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Wellness Apps */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Psychology sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6">Recommended Wellness Apps</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Headspace
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Meditation and mindfulness exercises for stress reduction
              </Typography>
            </ListItem>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Calm
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Sleep stories, meditations, and relaxation music
              </Typography>
            </ListItem>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                My3
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Safety planning app for crisis moments
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SelfHelpResources;