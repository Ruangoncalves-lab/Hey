import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import Integrations from './pages/Integrations';
import Finances from './pages/Finances';
import Alerts from './pages/Alerts';

import Settings from './pages/Settings';
import SocialMedia from './pages/SocialMedia';
import TrafficManager from './pages/TrafficManager';
import Campaigns from './pages/Campaigns';
import CreativeLibrary from './pages/CreativeLibrary';
import CampaignDetail from './pages/CampaignDetail';
import GoogleCampaignDetail from './pages/GoogleCampaignDetail';
import DeepAnalytics from './pages/DeepAnalytics';
import SmartCampaignCreator from './pages/SmartCampaignCreator';
import WhatsApp from './pages/WhatsApp';

import Login from './pages/Login';
import Register from './pages/Register';
import AuthCallback from './pages/AuthCallback';
import MetaDashboard from './pages/meta/Dashboard';
import MetaAccounts from './pages/meta/Accounts';
import MetaCampaigns from './pages/meta/Campaigns';
import MetaOnboarding from './pages/MetaOnboarding';
import GoogleOnboarding from './pages/GoogleOnboarding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="orders" element={<Orders />} />
          <Route path="integrations" element={<Integrations />} />

          {/* Traffic & Campaigns */}
          <Route path="traffic" element={<TrafficManager />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="creatives" element={<CreativeLibrary />} />

          {/* Keep detail routes accessible */}
          <Route path="campaigns/:id" element={<CampaignDetail />} />
          <Route path="traffic/google/campaign/:id" element={<GoogleCampaignDetail />} />

          <Route path="finances" element={<Finances />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="social-media" element={<SocialMedia />} />
          <Route path="analytics" element={<DeepAnalytics />} />
          <Route path="smart-campaign" element={<SmartCampaignCreator />} />
          <Route path="whatsapp" element={<WhatsApp />} />

          {/* Meta Ads Routes */}
          <Route path="meta/onboarding" element={<MetaOnboarding />} />
          <Route path="meta/dashboard" element={<MetaDashboard />} />
          <Route path="meta/accounts" element={<MetaAccounts />} />
          <Route path="meta/campaigns/:id" element={<MetaCampaigns />} />

          {/* Google Ads Routes */}
          <Route path="google/onboarding" element={<GoogleOnboarding />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
