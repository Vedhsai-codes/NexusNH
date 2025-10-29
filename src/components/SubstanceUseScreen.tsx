// src/components/SubstanceUseScreen.tsx

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fetchAllResources } from '../utils/googleSheetsApi';
 // assume you already have this
import { ResourceWithLive } from '../types/resource';
import { fetchResourcesWithLive } from '../utils/googleSheetsApi';
//import { Resource, LiveStatus } from '../types/resource';   // your types
import SMSHandler from './SMSHandler';


/* interface CombinedResource extends Resource {
  liveStatus?: LiveStatus;
} */
interface Props {
  lang: string;
}
const SubstanceUseScreen: React.FC<Props> = ({ lang }) => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<ResourceWithLive[]>([]);
  //const [resources, setResources] = useState<CombinedResource[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function load() {
      try {
        // Use fetchResourcesWithLive instead of fetchAllResources
        const allResourcesWithLive = await fetchResourcesWithLive();
        console.log('All resources with live data:', allResourcesWithLive); // Debug
        
        // Filter for substance use resources
        const filtered = allResourcesWithLive.filter(r => 
          r.type.toLowerCase().includes('substance')
        );
        console.log('Filtered substance use resources:', filtered); // Debug
        
        setResources(filtered);
      } catch (err) {
        console.error('Failed to load substance use resources', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h5">{t('substanceUse')}</Typography>
        <Typography variant="body2" color="textSecondary">
          {t('substanceUseIntro') ||
            'You can get help for substance use issues. Call 211 anytime to get connected, or view these local resources below.'}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => window.open('tel:211')}>
            {t('call211')}
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => window.open('tel:18006224357')}
          >
            {t('callSAMHSA')}
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {resources.length === 0 ? (
        <Typography>{t('noResourcesFound')}</Typography>
      ) : (
        <List>
          {resources.map((res) => (
            <React.Fragment key={res.name}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={res.name}
                  secondary={
                    <>
                      {res.address} <br />
                      {res.phone} <br />
                      
                      {res.capacity &&(
                                            <Typography variant="body2" display="block">
                                                      🛏️ {res.capacity}
                                            </Typography>
                                            )}
                      {res.notes && <span>{res.notes}</span>} <br />
                      {res.live && (
                        <span>
                          {t('availableBeds')}: {res.live.availableBeds} •
                          {t('waitTime')}: {res.live.waitTime}
                        </span>
                      )}
                    </>
                  }
                />
                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => window.open(`tel:${res.phone}`)}
                  >
                    {t('call')}
                  </Button>
                  <SMSHandler
                    serviceType="Substance Use"
                    phoneNumber={res.phone}
                  />
                </Box>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default SubstanceUseScreen;
