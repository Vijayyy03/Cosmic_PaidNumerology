import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ReportPage from './pages/ReportPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/numerology" replace />
    },
    {
        path: '/numerology',
        element: <LandingPage />
    },
    {
        path: '/numerology-form',
        element: <FormPage />
    },
    {
        path: '/numerology-report',
        element: <ReportPage />
    }
]);
