// src/components/BasicNeedsScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import {
  LocalDining,
  NightShelter,
  MedicalServices,
  Sanitizer,
  DirectionsBus,
  Warning
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { fetchAllResources } from '../utils/googleSheetsApi';
import { Resource } from '../types/resource';
import SMSHandler from './SMSHandler';

interface Props {
  lang: string;
}

interface UserNeeds {
  shelter: boolean;
  food: boolean;
  medical: boolean;
  hygiene: boolean;
  documents: boolean;
  transportation: boolean;
}

interface CrisisCheck {
  freezingTemp: boolean;
  unsafe: boolean;
  medicalEmergency: boolean;
  noFoodToday: boolean;
}

const BasicNeedsScreen: React.FC<Props> = ({ lang }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);
  const [userNeeds, setUserNeeds] = useState<UserNeeds>({
    shelter: false,
    food: false,
    medical: false,
    hygiene: false,
    documents: false,
    transportation: false
  });
  const [crisisCheck, setCrisisCheck] = useState<CrisisCheck>({
    freezingTemp: false,
    unsafe: false,
    medicalEmergency: false,
    noFoodToday: false
  });
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [userNeeds, resources]);

  const loadResources = async () => {
    try {
      const allResources = await fetchAllResources();
      setResources(allResources);
    } catch (err) {
      console.error('Failed to load basic needs resources', err);
    }
  };

  const filterResources = () => {
    const activeNeeds = Object.keys(userNeeds).filter(need => userNeeds[need as keyof UserNeeds]);
    
    if (activeNeeds.length === 0) {
      setFilteredResources([]);
      return;
    }

    const filtered = resources.filter(resource => {
      const resourceType = resource.type.toLowerCase();
      
      if (userNeeds.shelter && resourceType.includes('shelter')) return true;
      if (userNeeds.food && (resourceType.includes('food') || resourceType.includes('meal'))) return true;
      if (userNeeds.medical && resourceType.includes('medical')) return true;
      if (userNeeds.hygiene && resourceType.includes('hygiene')) return true;
      if (userNeeds.documents && resourceType.includes('document')) return true;
      
      return false;
    });

    setFilteredResources(filtered);
  };

  const handleNeedChange = (need: keyof UserNeeds) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNeeds(prev => ({
      ...prev,
      [need]: event.target.checked
    }));
  };

  const handleCrisisChange = (field: keyof CrisisCheck) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrisisCheck(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserNeeds({
      shelter: false,
      food: false,
      medical: false,
      hygiene: false,
      documents: false,
      transportation: false
    });
    setCrisisCheck({
      freezingTemp: false,
      unsafe: false,
      medicalEmergency: false,
      noFoodToday: false
    });
  };

  const hasUrgentCrisis = crisisCheck.medicalEmergency || crisisCheck.unsafe;

  const steps = [
    t('basicNeeds.crisisCheck'),
    t('basicNeeds.identifyNeeds'),
    t('basicNeeds.getHelp')
  ];

  // Crisis Check Step
  const renderCrisisStep = () => (
    <Box>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('basicNeeds.safetyFirst')}
        </Typography>
        {t('basicNeeds.crisisDisclaimer')}
      </Alert>

      <FormGroup>
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={crisisCheck.medicalEmergency}
                  onChange={handleCrisisChange('medicalEmergency')}
                  color="error"
                />
              }
              label={
                <Typography variant="body1" fontWeight="bold" color="error">
                  🚨 {t('basicNeeds.medicalEmergency')}
                </Typography>
              }
            />
            {crisisCheck.medicalEmergency && (
              <Alert severity="error" sx={{ mt: 1 }}>
                <Button 
                  variant="contained" 
                  color="error" 
                  href="tel:911"
                  fullWidth
                >
                  {t('basicNeeds.call911Now')}
                </Button>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={crisisCheck.unsafe}
                  onChange={handleCrisisChange('unsafe')}
                />
              }
              label={
                <Typography variant="body1" fontWeight="bold">
                  🛡️ {t('basicNeeds.feelUnsafe')}
                </Typography>
              }
            />
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={crisisCheck.freezingTemp}
                  onChange={handleCrisisChange('freezingTemp')}
                />
              }
              label={t('basicNeeds.freezingTemp')}
            />
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={crisisCheck.noFoodToday}
                  onChange={handleCrisisChange('noFoodToday')}
                />
              }
              label={t('basicNeeds.noFoodToday')}
            />
          </CardContent>
        </Card>
      </FormGroup>

      {hasUrgentCrisis && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <Typography variant="h6">{t('basicNeeds.urgentHelp')}</Typography>
          <Box sx={{ mt: 1 }}>
            <Button variant="contained" color="error" href="tel:211" sx={{ mr: 1 }}>
              {t('call211')}
            </Button>
            <Button variant="outlined" href="tel:6035894500">
              {t('basicNeeds.callNashuaPolice')}
            </Button>
          </Box>
        </Alert>
      )}
    </Box>
  );

  // Needs Identification Step
  const renderNeedsStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('basicNeeds.whatDoYouNeed')}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card 
            variant={userNeeds.shelter ? "elevation" : "outlined"}
            sx={{ 
              height: '100%',
              border: userNeeds.shelter ? 2 : 1,
              borderColor: userNeeds.shelter ? 'primary.main' : 'grey.300',
              backgroundColor: userNeeds.shelter ? 'primary.50' : 'background.paper'
            }}
          >
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userNeeds.shelter}
                    onChange={handleNeedChange('shelter')}
                    icon={<NightShelter />}
                    checkedIcon={<NightShelter color="primary" />}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight="bold">{t('basicNeeds.shelter')}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('basicNeeds.shelterDesc')}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card 
            variant={userNeeds.food ? "elevation" : "outlined"}
            sx={{ 
              height: '100%',
              border: userNeeds.food ? 2 : 1,
              borderColor: userNeeds.food ? 'primary.main' : 'grey.300',
              backgroundColor: userNeeds.food ? 'primary.50' : 'background.paper'
            }}
          >
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userNeeds.food}
                    onChange={handleNeedChange('food')}
                    icon={<LocalDining />}
                    checkedIcon={<LocalDining color="primary" />}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight="bold">{t('basicNeeds.food')}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('basicNeeds.foodDesc')}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card 
            variant={userNeeds.medical ? "elevation" : "outlined"}
            sx={{ 
              height: '100%',
              border: userNeeds.medical ? 2 : 1,
              borderColor: userNeeds.medical ? 'primary.main' : 'grey.300',
              backgroundColor: userNeeds.medical ? 'primary.50' : 'background.paper'
            }}
          >
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userNeeds.medical}
                    onChange={handleNeedChange('medical')}
                    icon={<MedicalServices />}
                    checkedIcon={<MedicalServices color="primary" />}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight="bold">{t('basicNeeds.medical')}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('basicNeeds.medicalDesc')}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card 
            variant={userNeeds.hygiene ? "elevation" : "outlined"}
            sx={{ 
              height: '100%',
              border: userNeeds.hygiene ? 2 : 1,
              borderColor: userNeeds.hygiene ? 'primary.main' : 'grey.300',
              backgroundColor: userNeeds.hygiene ? 'primary.50' : 'background.paper'
            }}
          >
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userNeeds.hygiene}
                    onChange={handleNeedChange('hygiene')}
                    icon={<Sanitizer />}
                    checkedIcon={<Sanitizer color="primary" />}
                  />
                }
                label={
                  <Box>
                    <Typography fontWeight="bold">{t('basicNeeds.hygiene')}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t('basicNeeds.hygieneDesc')}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // Results Step
  const renderResultsStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('basicNeeds.resourcesForYou')}
      </Typography>

      {crisisCheck.freezingTemp && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography fontWeight="bold">
            ❄️ {t('basicNeeds.warmingCenterAlert')}
          </Typography>
          {t('basicNeeds.warmingCenterInfo')}
        </Alert>
      )}

      {crisisCheck.noFoodToday && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography fontWeight="bold">
            🍕 {t('basicNeeds.emergencyFoodAlert')}
          </Typography>
          {t('basicNeeds.emergencyFoodInfo')}
        </Alert>
      )}

      {filteredResources.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {t('basicNeeds.noResourcesMatch')}
          </Typography>
          <Button onClick={handleBack} sx={{ mt: 2 }}>
            {t('basicNeeds.adjustNeeds')}
          </Button>
        </Paper>
      ) : (
        <List>
          {filteredResources.map((resource, index) => (
            <React.Fragment key={resource.name}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  {resource.type.toLowerCase().includes('shelter') && <NightShelter color="primary" />}
                  {resource.type.toLowerCase().includes('food') && <LocalDining color="primary" />}
                  {resource.type.toLowerCase().includes('medical') && <MedicalServices color="primary" />}
                  {(resource.type.toLowerCase().includes('hygiene') || resource.type.toLowerCase().includes('shower')) && <Sanitizer color="primary" />}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="h6">{resource.name}</Typography>
                      <Chip 
                        label={resource.type} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                      {resource.status && (
                        <Chip 
                          label={resource.status} 
                          size="small"
                          color={resource.status === 'Open' ? 'success' : 'default'}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" display="block">
                        📍 {resource.address}
                      </Typography>
                      <Typography variant="body2" display="block">
                        📞 {resource.phone}
                      </Typography>
                      {resource.hours && (
                        <Typography variant="body2" display="block">
                          🕒 {resource.hours}
                        </Typography>
                      )}
                      {resource.notes && (
                        <Typography variant="body2" display="block" fontStyle="italic">
                          💡 {resource.notes}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 120 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => window.open(`tel:${resource.phone}`)}
                  >
                    {t('call')}
                  </Button>
                  <SMSHandler
                    serviceType={`Basic Needs - ${resource.type}`}
                    phoneNumber={resource.phone}
                  />
                </Box>
              </ListItem>
              {index < filteredResources.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}

      {/* Transportation Assistance */}
      {(userNeeds.transportation || filteredResources.length > 0) && (
        <Paper sx={{ p: 2, mt: 3, backgroundColor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            <DirectionsBus color="action" sx={{ mr: 1 }} />
            {t('basicNeeds.transportationHelp')}
          </Typography>
          <Typography variant="body2" paragraph>
            {t('basicNeeds.transportationInfo')}
          </Typography>
          <Button 
            variant="outlined" 
            href="tel:6038800100"
            sx={{ mr: 1 }}
          >
            {t('basicNeeds.callNashuaTransit')}
          </Button>
          <Button 
            variant="outlined" 
            href="https://www.nashuanh.gov/456/Bus-Routes-Schedules"
            target="_blank"
          >
            {t('basicNeeds.viewRoutes')}
          </Button>
        </Paper>
      )}
    </Box>
  );

  const stepContent = [
    renderCrisisStep(),
    renderNeedsStep(),
    renderResultsStep()
  ];

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom color="primary">
          {t('basicNeeds.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('basicNeeds.subtitle')}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {stepContent[activeStep]}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            {t('back')}
          </Button>
          
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button onClick={handleReset} variant="outlined">
                {t('basicNeeds.startOver')}
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                variant="contained"
                disabled={activeStep === 0 && hasUrgentCrisis}
              >
                {t('next')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BasicNeedsScreen;