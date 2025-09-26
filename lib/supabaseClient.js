import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const missingConfigError = new Error('Supabase credentials are not configured.');

const createMockQueryBuilder = () => {
  const state = { result: { data: null, error: missingConfigError } };

  const builder = {
    select() {
      state.result = { data: [], error: missingConfigError };
      return builder;
    },
    insert() {
      state.result = { data: null, error: missingConfigError };
      return builder;
    },
    update() {
      state.result = { data: null, error: missingConfigError };
      return builder;
    },
    delete() {
      state.result = { data: null, error: missingConfigError };
      return builder;
    },
    eq() {
      return builder;
    },
    order() {
      return builder;
    },
    limit() {
      return builder;
    },
    single() {
      return Promise.resolve({ data: null, error: missingConfigError });
    },
    maybeSingle() {
      return Promise.resolve({ data: null, error: missingConfigError });
    },
    then(resolve, reject) {
      return Promise.resolve(state.result).then(resolve, reject);
    },
  };

  return builder;
};

const createMockSupabase = () => ({
  from() {
    return createMockQueryBuilder();
  },
  rpc() {
    return Promise.reject(missingConfigError);
  },
  storage: {
    from() {
      return {
        async upload() {
          throw missingConfigError;
        },
        getPublicUrl() {
          return { data: { publicUrl: '' }, error: missingConfigError };
        },
      };
    },
  },
});

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  const globalRef = typeof globalThis !== 'undefined' ? globalThis : {};
  if (!globalRef.__supabaseConfigWarned) {
    console.warn('Supabase environment variables are not configured. Falling back to a mock client.');
    globalRef.__supabaseConfigWarned = true;
  }
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockSupabase();