import { RouterConfig } from '@/routes/router-config';

import { BrowserRouter } from 'react-router';

export function App() {
  return (
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  );
}
