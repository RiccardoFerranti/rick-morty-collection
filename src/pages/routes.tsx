import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Listing from './Listing';
import Details from './Details';
import NotFound from './NotFound';
import Layout from '../Layout/Layout';

const AppRoutes: FC = () => (
  <Layout>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/rick-morty-collection" element={<Listing />} />
      <Route path="rick-morty-collection/character/:id" element={<Details />} />
      <Route path="rick-morty-collection/episode/:id" element={<Details />} />
      <Route path="rick-morty-collection/location/:id" element={<Details />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
