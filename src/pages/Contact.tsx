import styled from '@emotion/styled';

const PageContainer = styled.div`
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8faf8;
  padding: 3rem 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(26, 71, 42, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #1a472a;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  font-size: 1.4rem;
  color: #2d5a3c;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  padding: 1.5rem;
  background: #f8faf8;
  border-radius: 16px;
  border: 1px solid rgba(76, 175, 80, 0.1);

  &:hover {
    background: #f0f5f0;
  }
`;

const ContactLabel = styled.h3`
  color: #1a472a;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const ContactValue = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Contact = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <Title>צור קשר</Title>
        <Subtitle>
          אנחנו כאן לעזור ולתמוך בכם בכל שאלה או בקשה
        </Subtitle>
        <ContactInfo>
          <ContactItem>
            <ContactLabel>שעות פעילות</ContactLabel>
            <ContactValue>ימים א'-ה': 09:00-18:00</ContactValue>
          </ContactItem>
          <ContactItem>
            <ContactLabel>טלפון</ContactLabel>
            <ContactValue>03-1234567</ContactValue>
          </ContactItem>
          <ContactItem>
            <ContactLabel>דוא"ל</ContactLabel>
            <ContactValue>info@theoak.co.il</ContactValue>
          </ContactItem>
          <ContactItem>
            <ContactLabel>כתובת</ContactLabel>
            <ContactValue>רחוב דיזנגוף 123, תל אביב</ContactValue>
          </ContactItem>
        </ContactInfo>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Contact; 