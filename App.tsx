

import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage'; 
import PostServicePage from './pages/PostServicePage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NewDashboardPage from './pages/NewDashboardPage'; 
import MyListingsView from './components/dashboard/MyListingsView';
import { InquiriesView } from './components/dashboard/InquiriesView'; 
import ProfileSetupPage from './pages/ProfileSetupPage'; 
import InquiryFormPage from './pages/InquiryFormPage'; 
import NotificationsPage from './pages/NotificationsPage';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage';
import ContactUsPage from './pages/ContactUsPage';
import RecentlyDeletedPage from './pages/RecentlyDeletedPage';
import SettingsPage from './pages/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { PWAInstallProvider } from './contexts/PWAInstallContext';


const App: React.FC = () => {

  useEffect(() => {
    // This function contains the logic to register the service worker.
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        // Construct the full URL to the service worker to avoid cross-origin issues.
        const swUrl = `${window.location.origin}/service-worker.js`;
        navigator.serviceWorker.register(swUrl)
          .then(swReg => {
            console.log('Servizo: Service Worker is registered.', swReg);
          })
          .catch(error => {
            console.error('Servizo: Service Worker registration failed.', error);
          });
      } else {
        console.warn('Servizo: Push messaging is not supported by this browser.');
      }
    };
    
    // The 'load' event fires when the whole page has loaded, including all
    // dependent resources. This is the safest time to register a service worker
    // and avoids the "document is in an invalid state" error.
    window.addEventListener('load', registerServiceWorker);

    // Cleanup the event listener when the component unmounts.
    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []); // Empty dependency array ensures this effect runs only once.


  return (
    <AuthProvider>
      <ToastProvider>
        <PWAInstallProvider>
          <ReactRouterDOM.HashRouter>
            <Layout>
              <ReactRouterDOM.Routes>
                <ReactRouterDOM.Route path="/" element={<HomePage />} />
                <ReactRouterDOM.Route path="/service/:serviceId" element={<ServiceDetailPage />} />
                
                <ReactRouterDOM.Route path="/login" element={<LoginPage />} />
                <ReactRouterDOM.Route path="/signup" element={<SignupPage />} />
                <ReactRouterDOM.Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <ReactRouterDOM.Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Legal & Static Pages */}
                <ReactRouterDOM.Route path="/terms" element={<TermsPage />} />
                <ReactRouterDOM.Route path="/privacy" element={<PrivacyPolicyPage />} />
                <ReactRouterDOM.Route path="/community-guidelines" element={<CommunityGuidelinesPage />} />
                <ReactRouterDOM.Route path="/contact" element={<ContactUsPage />} />


                {/* Protected Routes */}
                <ReactRouterDOM.Route element={<ProtectedRoute />}>
                  <ReactRouterDOM.Route path="/post" element={<PostServicePage />} />
                  <ReactRouterDOM.Route path="/post-service/edit/:serviceId" element={<PostServicePage />} /> 
                  
                  <ReactRouterDOM.Route path="/dashboard" element={<NewDashboardPage />}>
                    <ReactRouterDOM.Route path="listings" element={<MyListingsView />} />
                    <ReactRouterDOM.Route path="inquiries" element={<InquiriesView />} />
                    <ReactRouterDOM.Route path="recently-deleted" element={<RecentlyDeletedPage />} />
                  </ReactRouterDOM.Route>
                  
                  <ReactRouterDOM.Route path="/profile-setup" element={<ProfileSetupPage />} />
                  <ReactRouterDOM.Route path="/service/:serviceId/inquire" element={<InquiryFormPage />} />
                  <ReactRouterDOM.Route path="/settings" element={<SettingsPage />} />
                  <ReactRouterDOM.Route path="/notifications" element={<NotificationsPage />} />
                </ReactRouterDOM.Route>
                
                <ReactRouterDOM.Route path="/profile" element={<ProfilePage />} /> 
                <ReactRouterDOM.Route path="/profile/:userId" element={<ProfilePage />} /> 
                
                <ReactRouterDOM.Route path="/search" element={<SearchResultsPage />} />
                <ReactRouterDOM.Route path="/404" element={<NotFoundPage />} />
                <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" replace />} />
              </ReactRouterDOM.Routes>
            </Layout>
          </ReactRouterDOM.HashRouter>
        </PWAInstallProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
