// src/components/TriageResultScreen.tsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TriageResultDisplay from './TriageResult';
import { TriageResult } from './TriageQuestionnaire';

const TriageResultScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state as TriageResult | undefined;

  if (!result) {
    return (
      <div>
        <h3>No result found</h3>
        <p>Please complete the questionnaire first.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <TriageResultDisplay
      result={result}
      onReset={() => navigate('/')}
    />
  );
};

export default TriageResultScreen;
