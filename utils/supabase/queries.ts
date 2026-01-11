import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient<any, any, any>) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient<any, any, any>) => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient<any, any, any>) => {
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' });

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient<any, any, any>) => {
  const { data: userDetails } = await supabase
    .from('profiles')
    .select('*')
    .single();
  return userDetails;
});

export const getAppSettings = cache(async (supabase: SupabaseClient<any, any, any>) => {
  const { data: settings } = await supabase
    .from('app_settings')
    .select('*')
    .single();
  return settings;
});
