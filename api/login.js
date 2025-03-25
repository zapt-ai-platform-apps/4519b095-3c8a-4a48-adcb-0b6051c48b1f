import * as Sentry from '@sentry/node';
import { supabase } from './_apiUtils';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  console.log('Login API called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return res.status(401).json({ message: error.message });
    }

    return res.status(200).json({ 
      token: data.session.access_token,
      user: data.user
    });
  } catch (error) {
    console.error('Server error during login:', error);
    Sentry.captureException(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}