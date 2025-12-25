import React, { Suspense } from 'react';
import { DataProvider } from './context/DataContext';
import LoadingSpinner from './components/common/LoadingSpinner';
import MainLayout from './components/layout/MainLayout';

const App: React.FC = () => {
  return (
    <DataProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <MainLayout />
      </Suspense>
    </DataProvider>
  );
};

export default App;