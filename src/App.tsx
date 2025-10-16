// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Toolbar } from '@mui/material';

import AppHeader from './components/AppHeader';
import WelcomeScreen from './components/WelcomeScreen';
import MentalHealthScreen from './components/MentalHealthScreen';
import SubstanceUseScreen from './components/SubstanceUseScreen';
import BasicNeedsScreen from './components/BasicNeedsScreen';
import TriageResultScreen from './components/TriageResultScreen';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language as string);

  // synchronize i18n when lang state changes
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader lang={lang} setLang={setLang} />
        
        {/* Spacer for fixed AppBar */}
        <Toolbar />
        
        {/* Main content area */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route
              path="/"
              element={<WelcomeScreen lang={lang} setLang={setLang} />}
            />
            <Route
              path="/mental-health"
              element={<MentalHealthScreen lang={lang} />}
            />
            <Route
              path="/substance-use"
              element={<SubstanceUseScreen lang={lang} />}
            />
            <Route
              path="/basic-needs"
              element={<BasicNeedsScreen lang={lang} />}
            />
            <Route 
              path="/triage-result" 
              element={<TriageResultScreen />} 
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;