import { createClient } from '../client/client';

const heyApiClient = createClient({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
});

export default heyApiClient;
