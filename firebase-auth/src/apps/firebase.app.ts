import { firebaseConfig } from '@/config/firebase.config';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
