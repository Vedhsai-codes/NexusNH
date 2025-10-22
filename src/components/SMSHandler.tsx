// src/components/SMSHandler.tsx
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  serviceType: string;
  phoneNumber?: string; 
  lang?: 'en' | 'es'; 
  onSuccess?: () => void; 
}

const SMSHandler: React.FC<Props> = ({ serviceType, phoneNumber = '741741', onSuccess }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSend = async () => {
    setStatus('sending');
    try {
      const resp = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType,
          message: `${t('sms.intro')} ${serviceType}. ${t('sms.closing')}`,
        }),
      });

      if (resp.ok) {
        setStatus('success');
        onSuccess?.(); // call optional success handler
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('SMS error', err);
      setStatus('error');
    }
  };

  return (
    <div>
      <Typography variant="body1" gutterBottom>
        {t('sms.instruction')}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleSend}
        disabled={status === 'sending' || status === 'success'}
        aria-label={t('sms.ariaLabel')}
      >
        {t('sms.button')}
      </Button>

      {status === 'success' && (
        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
          {t('sms.success')}
        </Typography>
      )}
      {status === 'error' && (
        <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
          {t('sms.error')}
        </Typography>
      )}
    </div>
  );
};

export default SMSHandler;
