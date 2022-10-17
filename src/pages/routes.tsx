import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Listing from './Listing';
import Detail from './Detail';
import NotFound from './NotFound';

const AppRoutes: FC = () => (
  <Routes>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Listing />} />
    <Route path="/character/:id" element={<Detail />} />
    <Route path="/episode/:id" element={<Detail />} />
    <Route path="/location/:id" element={<Detail />} />
  </Routes>
);

export default AppRoutes;
