import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';
import Home from './pages/Home';
import InfoForm from './pages/InfoForm';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ServicePage from './pages/ServicePage';
import AdaptedHomePage from './pages/InfoCardsPages/AdaptedHomePage';
import WelfarePage from './pages/InfoCardsPages/WelfarePage';
import NursingPage from './pages/InfoCardsPages/NursingPage';
import HousingPage from './pages/InfoCardsPages/HousingPage';
import HealthPage from './pages/InfoCardsPages/HealthPage';
import RightsPage from './pages/InfoCardsPages/RightsPage';
import HomeAdjustmentsPage from './pages/InfoCardsPages/HomeAdjustmentsPage';

// Main container styling
const AppContainer = styled.div`
  direction: rtl;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #D5D9BA !important;
`;

// Main content wrapper
const ContentWrapper = styled.main`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #D5D9BA !important;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<InfoForm />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services/:type" element={<ServicePage />} />
            <Route path="/services/adapted-home" element={<AdaptedHomePage />} />
            <Route path="/services/welfare" element={<WelfarePage />} />
            <Route path="/services/nursing" element={<NursingPage />} />
            <Route path="/services/housing" element={<HousingPage />} />
            <Route path="/services/health" element={<HealthPage />} />
            <Route path="/services/rights" element={<RightsPage />} />
            <Route path="/services/home-adjustments" element={<HomeAdjustmentsPage />} />
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </Router>
  );
}

export default App;
