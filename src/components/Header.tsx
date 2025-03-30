import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: #4CAF50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  position: absolute;
  right: 0;
  &:hover {
    color: #e0e0e0;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  padding: 0 150px; /* Make space for the logo */
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    color: #e0e0e0;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">The Oak</Logo>
        <NavLinks>
          <NavLink to="/">דף הבית</NavLink>
          <NavLink to="/info">מילוי המידע</NavLink>
          <NavLink to="/categories">קטגוריות השירותים</NavLink>
          <NavLink to="/contact">צור קשר</NavLink>
          <NavLink to="/login">התחברות לאזור האישי</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 