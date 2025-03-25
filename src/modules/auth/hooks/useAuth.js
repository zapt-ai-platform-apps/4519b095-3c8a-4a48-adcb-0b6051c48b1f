import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/supabaseClient';
import { eventBus } from '@/modules/core/events';
import { events } from '../events';

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasSessionRef = useRef(false);
  
  // Use this function to update session so we also update our ref
  const updateSession = (newSession) => {
    setSession(newSession);
    hasSessionRef.current = newSession !== null;
  };
  
  useEffect(() => {
    console.log('Setting up auth listener');
    // Check active session on initial mount
    const checkSession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        // Set initial session
        updateSession(data.session);
        if (data.session) {
          hasSessionRef.current = true;
          eventBus.publish(events.USER_SIGNED_IN, { user: data.session.user });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setError(error);
        setLoading(false);
      }
    };
    
    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log('Auth event:', event, 'Has session:', hasSessionRef.current);
      
      // For SIGNED_IN, only update session if we don't have one
      if (event === 'SIGNED_IN') {
        if (!hasSessionRef.current) {
          updateSession(newSession);
          if (newSession?.user) {
            eventBus.publish(events.USER_SIGNED_IN, { user: newSession.user });
          }
        } else {
          console.log('Already have session, ignoring SIGNED_IN event');
        }
      }
      // For TOKEN_REFRESHED, always update the session
      else if (event === 'TOKEN_REFRESHED') {
        updateSession(newSession);
      }
      // For SIGNED_OUT, clear the session
      else if (event === 'SIGNED_OUT') {
        updateSession(null);
        eventBus.publish(events.USER_SIGNED_OUT, {});
      }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []); // No dependencies to prevent re-creating the listener
  
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) throw signInError;
      
      return { success: true, data };
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error);
      eventBus.publish(events.AUTH_ERROR, { error });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  
  return {
    session,
    user: session?.user || null,
    loading,
    error,
    signIn,
    signOut,
  };
}