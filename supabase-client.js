// Supabase client scaffold
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your project's values
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'public-anon-key';

let supabaseClient = null;
function initSupabase(){
  if(window.supabase && !supabaseClient){
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}

async function submitScore(name, score){
  if(!supabaseClient) initSupabase();
  if(!supabaseClient) return { error: 'Supabase not initialized' };
  const { data, error } = await supabaseClient.from('leaderboard').insert([{ player: name, score }]);
  return { data, error };
}

async function getLeaderboard(limit=10){
  if(!supabaseClient) initSupabase();
  if(!supabaseClient) return { error: 'Supabase not initialized' };
  const { data, error } = await supabaseClient.from('leaderboard').select('*').order('score', { ascending: false }).limit(limit);
  return { data, error };
}

// Expose to global for demo usage
window.supabaseClientUtils = { initSupabase, submitScore, getLeaderboard };
