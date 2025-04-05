import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  background-color: #D5D9BA !important;
  min-height: calc(100vh - 80px);
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a472a;
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CategoryTitle = styled.h2`
  color: #1a472a;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ServiceButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    const searchParams = new URLSearchParams(location.search);
    const answer = searchParams.get('answer');
    if (answer) {
      navigate(`${path}?answer=${answer}`);
    } else {
      navigate(path);
    }
  };

  const categories = [
    { title: 'רווחה', path: '/services/welfare' },
    { title: 'התאמות לבית', path: '/services/home-adjustments' },
    { title: 'סיעוד', path: '/services/nursing' },
    { title: 'פתרונות דיור', path: '/services/housing' },
    { title: 'בריאות', path: '/services/health' },
    { title: 'זכויות', path: '/services/rights' },
    { title: 'בית מותאם', path: '/services/adapted-home' }
  ];

  return (
    <Container>
      <Title>קטגוריות שירותים</Title>
      <CategoriesGrid>
        {categories.map((category) => (
          <CategoryCard key={category.path}>
            <CategoryTitle>{category.title}</CategoryTitle>
            <ServiceButton onClick={() => handleNavigate(category.path)}>
              רשימת שירותים
            </ServiceButton>
          </CategoryCard>
        ))}
      </CategoriesGrid>
    </Container>
  );
};

export default Categories; 