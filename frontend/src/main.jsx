import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReportProvider } from './context/ReportContext';
import { router } from './router';
import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ReportProvider>
        <RouterProvider router={router} />
      </ReportProvider>
    </HelmetProvider>
  </StrictMode>
);
