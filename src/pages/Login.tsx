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
  max-width: 500px;
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(26, 71, 42, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.1);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #1a472a;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #1a472a;
  font-size: 1.1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const LoginButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-weight: 500;
  width: 100%;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(76, 175, 80, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ForgotPassword = styled.a`
  color: #4CAF50;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 1rem;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>התחברות לאזור האישי</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>דוא"ל</Label>
            <Input type="email" placeholder="הכנס את כתובת הדוא״ל שלך" />
          </FormGroup>
          <FormGroup>
            <Label>סיסמה</Label>
            <Input type="password" placeholder="הכנס את הסיסמה שלך" />
          </FormGroup>
          <LoginButton type="submit">התחבר</LoginButton>
          <ForgotPassword href="#">שכחת סיסמה?</ForgotPassword>
        </Form>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login; 