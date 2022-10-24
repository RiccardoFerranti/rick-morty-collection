import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Listing from './Listing';
import Details from './Details';
import NotFound from './NotFound';
import Layout from '../Layout/Layout';

const AppRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path="/rick-morty-collection" element={<Listing />} />
      {/* <Route path='/' element={<Navigate replace to='/rick-morty-collection'/>} /> */}
      <Route path="rick-morty-collection/character/:id" element={<Details />} />
      <Route path="rick-morty-collection/episode/:id" element={<Details />} />
      <Route path="rick-morty-collection/location/:id" element={<Details />} />
      <Route path='/404' element={<NotFound/>} />
      <Route path='*' element={<Navigate replace to='/404'/>} />
    </Routes>
  </Layout>
);

export default AppRoutes;
