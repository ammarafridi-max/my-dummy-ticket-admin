import 'react-tooltip/dist/react-tooltip.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './app/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 600000,
    },
  },
});

export default function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HelmetProvider>
          <AppRoutes />
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}
