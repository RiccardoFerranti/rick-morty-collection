import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Listing from './Listing';
import Details from './Details';
import NotFound from './NotFound';
import Layout from '../Layout/Layout';

const AppRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Listing />} />
      {/* <Route path='/' element={<Navigate replace to='/rick-morty-collection'/>} /> */}
      <Route path="/character/:id" element={<Details />} />
      <Route path="/episode/:id" element={<Details />} />
      <Route path="/location/:id" element={<Details />} />
      <Route path='/404' element={<NotFound/>} />
      <Route path='*' element={<Navigate replace to='/404'/>} />
    </Routes>
  </Layout>
);

export default AppRoutes;
