import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface TriageResult {
  level: 'talk-now' | 'next-48h' | 'self-help';
  title: string;
  description: string;
  actions: string[];
  resources: string[];
}

interface Props {
  onComplete: (result: TriageResult) => void;
}

const TriageQuestionnaire: React.FC<Props> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Safe translation helper that always returns string[]
  const getTranslatedArray = (key: string): string[] => {
    try {
      const result = t(key, { returnObjects: true });
      if (Array.isArray(result)) {
        return result.map(item => String(item)); // Convert all items to strings
      }
      return [];
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return [];
    }
  };

  const PHQ2_QUESTIONS = [
    {
      id: 1,
      question: t('phq2.question1'),
      options: [
        { value: 0, label: t('phq2.options.notAtAll') },
        { value: 1, label: t('phq2.options.severalDays') },
        { value: 2, label: t('phq2.options.moreThanHalf') },
        { value: 3, label: t('phq2.options.nearlyEveryDay') },
      ],
    },
    {
      id: 2,
      question: t('phq2.question2'),
      options: [
        { value: 0, label: t('phq2.options.notAtAll') },
        { value: 1, label: t('phq2.options.severalDays') },
        { value: 2, label: t('phq2.options.moreThanHalf') },
        { value: 3, label: t('phq2.options.nearlyEveryDay') },
      ],
    },
  ];

  const TRIAGE_RESULTS: { [key: string]: TriageResult } = {
    'talk-now': {
      level: 'talk-now',
      title: t('phq2.results.talkNow.title'),
      description: t('phq2.results.talkNow.description'),
      actions: getTranslatedArray('phq2.results.talkNow.actions'),
      resources: getTranslatedArray('phq2.results.talkNow.resources'),
    },
    'next-48h': {
      level: 'next-48h',
      title: t('phq2.results.next48h.title'),
      description: t('phq2.results.next48h.description'),
      actions: getTranslatedArray('phq2.results.next48h.actions'),
      resources: getTranslatedArray('phq2.results.next48h.resources'),
    },
    'self-help': {
      level: 'self-help',
      title: t('phq2.results.selfHelp.title'),
      description: t('phq2.results.selfHelp.description'),
      actions: getTranslatedArray('phq2.results.selfHelp.actions'),
      resources: getTranslatedArray('phq2.results.selfHelp.resources'),
    },
  };

  const handleStart = () => setShowDisclaimer(false);

  const handleAnswer = (questionId: number, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < PHQ2_QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        const scores = Object.values(newAnswers);
        const total = scores.reduce((sum, s) => sum + s, 0);
        const result =
          total >= 4
            ? TRIAGE_RESULTS['talk-now']
            : total >= 2
            ? TRIAGE_RESULTS['next-48h']
            : TRIAGE_RESULTS['self-help'];
        onComplete(result);
      }
    }, 500);
  };

  if (showDisclaimer) {
    const disclaimerPoints = getTranslatedArray('phq2.disclaimerPoints');
    
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            {t('phq2.disclaimerTitle')}
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="bold">
              {t('phq2.disclaimerAlert')}
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>
            <span dangerouslySetInnerHTML={{ __html: t('phq2.disclaimerText') }} />
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            {disclaimerPoints.map((point: string, index: number) => (
              <React.Fragment key={index}>
                • {point}<br />
              </React.Fragment>
            ))}
          </Typography>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" onClick={handleStart} size="large">
              {t('phq2.startButton')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = PHQ2_QUESTIONS[currentStep];
  const selectedValue = answers[currentQuestion.id];

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
          {PHQ2_QUESTIONS.map((_, i) => (
            <Step key={i}>
              <StepLabel>{t('phq2.progress', { current: i + 1, total: PHQ2_QUESTIONS.length })}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <FormLabel component="legend">
            <Typography variant="h6">{currentQuestion.question}</Typography>
          </FormLabel>
          <RadioGroup>
            {currentQuestion.options.map((opt) => (
              <Card
                key={opt.value}
                variant="outlined"
                onClick={() => handleAnswer(currentQuestion.id, opt.value)}
                sx={{
                  mb: 1,
                  border: selectedValue === opt.value ? 2 : 1,
                  borderColor: selectedValue === opt.value ? 'primary.main' : 'grey.300',
                  backgroundColor: selectedValue === opt.value ? 'primary.50' : 'background.paper',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'primary.50',
                  },
                }}
              >
                <FormControlLabel
                  value={opt.value}
                  control={<Radio checked={selectedValue === opt.value} />}
                  label={<Typography>{opt.label}</Typography>}
                  sx={{ width: '100%', m: 0, p: 2 }}
                />
              </Card>
            ))}
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {t('phq2.progress', { current: currentStep + 1, total: PHQ2_QUESTIONS.length })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TriageQuestionnaire;