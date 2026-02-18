import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/PageLoader';

// Lazy Load Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Suspense Wrapper
const Loadable = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/numerology" replace />
            },
            {
                path: 'numerology',
                element: Loadable(LandingPage)
            },
            {
                path: 'numerology-form',
                element: Loadable(FormPage)
            },
            {
                path: 'numerology-report',
                element: Loadable(ReportPage)
            },
            {
                path: '*',
                element: Loadable(NotFound)
            }
        ]
    },
    {
        path: '/privacy-policy',
        element: Loadable(PrivacyPolicy)
    },
    {
        path: '/terms-conditions',
        element: Loadable(TermsConditions)
    },
    {
        path: '/refund-policy',
        element: Loadable(RefundPolicy)
    }
]);
