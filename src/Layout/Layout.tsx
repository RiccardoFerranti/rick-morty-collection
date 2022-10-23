import { FC } from 'react';
import { Link } from 'react-router-dom';

import { StyledLayout, StyledLogo } from './Layout.style';

import logo from "../images/rick-and-morty-logo.jpeg";

interface ILayoutProps {
  children: JSX.Element | JSX.Element[],
}

const Layout: FC<ILayoutProps> = ({ children }) => (
  <>
    <header>
      <Link to="/"><StyledLogo src={logo} title="Rick and Morty Logo" alt="Rick and Morty" /></Link>
    </header>
    <StyledLayout>{children}</StyledLayout>
  </>
);

export default Layout;
