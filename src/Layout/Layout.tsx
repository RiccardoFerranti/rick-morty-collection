import { FC } from 'react';
import { StyledLayout, StyledLogo } from './Layout.style';

import logo from "../images/rick-and-morty-logo.jpeg";
import { Link } from 'react-router-dom';


const Layout: FC<any> = ({ children }) => (
  <>
    <header>
      <Link to="/"><StyledLogo src={logo} /></Link>
    </header>
    <main>
      <StyledLayout>{children}</StyledLayout>
    </main>
</>
);

export default Layout;

