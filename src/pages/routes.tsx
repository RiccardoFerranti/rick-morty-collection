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
      <Route path="/" element={<Listing />} />
      <Route path="/character/:id" element={<Details />} />
      <Route path="/episode/:id" element={<Details />} />
      <Route path="/location/:id" element={<Details />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
