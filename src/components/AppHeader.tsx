// src/components/AppHeader.tsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

interface Props {
  lang: string;
  setLang: (lang: string) => void;
}

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const AppHeader: React.FC<Props> = ({ lang, setLang }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isHome = location.pathname === '/';

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/mental-health': return t('mentalHealth');
      case '/substance-use': return t('substanceUse');
      case '/basic-needs': return t('basicNeedsT');
      case '/triage-result': return t('mentalHealth');
      default: return 'NexusNH';
    }
  };

  return (
    <HideOnScroll>
      <AppBar position="fixed" color="primary" elevation={3}>
        <Toolbar>
          {/* Back Button - Show only when not on home page */}
          {!isHome && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ mr: 1 }}
              aria-label={t('back')}
            >
              <ArrowBack />
            </IconButton>
          )}
          
          {/* Home Button - Always visible */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
            aria-label={t('welcome')}
          >
            <Home />
          </IconButton>

          {/* Page Title */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            {getPageTitle()}
          </Typography>

          {/* Language Toggle */}
          <Box sx={{ ml: 2 }}>
            <LanguageToggle lang={lang} onSelect={setLang} />
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default AppHeader;