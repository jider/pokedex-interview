import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react';
import { createRoot } from 'react-dom/client';
import {AuthContextProvider, NetworkContextProvider} from './context'
import App from './App';

import './styles'

const queryClient = new QueryClient()

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <NetworkContextProvider>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthContextProvider>
  </NetworkContextProvider>
);
