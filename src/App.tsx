import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';
import Home from './pages/Home.tsx';
import InfoForm from './pages/InfoForm.tsx';
import Categories from './pages/Categories.tsx';
import Contact from './pages/Contact.tsx';
import Login from './pages/Login.tsx';
import ServicePage from './pages/ServicePage.tsx';
import AdaptedHomePage from './pages/InfoCardsPages/AdaptedHomePage.tsx';
import WelfarePage from './pages/InfoCardsPages/WelfarePage.tsx';
import NursingPage from './pages/InfoCardsPages/NursingPage.tsx';
import HousingPage from './pages/InfoCardsPages/HousingPage.tsx';
import HealthPage from './pages/InfoCardsPages/HealthPage.tsx';
import RightsPage from './pages/InfoCardsPages/RightsPage.tsx';
import HomeAdjustmentsPage from './pages/InfoCardsPages/HomeAdjustmentsPage.tsx';

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
  );
}

export default App;
