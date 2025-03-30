import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.2));
  border-radius: 10px;
  margin: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const MainButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <Title>ברוכים הבאים ל-The Oak</Title>
      <MainButton onClick={() => navigate('/info')}>
        ניתוח מקרה לקבלת המלצות מותאמות אישית
      </MainButton>
    </HeroSection>
  );
};

export default Home; 