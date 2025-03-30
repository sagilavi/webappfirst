import { useEffect } from 'react';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  min-height: calc(100vh - 80px); /* Subtract header height */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #9DC88D; /* Lighter shade of green */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 2rem 0;
  text-align: center;
`;

const ContentSection = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: #B4D3A7; /* Third shade of green */
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 600px; /* Fixed height for the form */
`;

const InfoForm = () => {
  useEffect(() => {
    // Load Typeform script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageContainer>
      <ContentSection>
        <Title>שאלון אבחון גרנטולוגי</Title>
        <Description>
          מטרת השאלון הינה ליצר אבחון גרנטולוגי מפורט בכדי לסייע לכם להתמודד עם התמיכה היקרה לכם
          בצורה המיטבית, לצלוח את התהליך השינוי ולממש את זכויותיכם וזכויותיהם באופן המיטבי
        </Description>
        <FormContainer>
          <div data-tf-live="01JQ1Y7QG16MXVBTAGD7NVX6XQ"></div>
        </FormContainer>
      </ContentSection>
    </PageContainer>
  );
};

export default InfoForm; 