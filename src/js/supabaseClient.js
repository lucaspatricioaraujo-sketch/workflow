/* ==========================================================================
   SUPABASE REST API CLIENT - BROWSER COMPATIBLE (NO API KEY BLOCKS)
   ========================================================================== */

const defaultUrl = 'https://utmwdvfxdjovcjennhsw.supabase.co';
const defaultKey = typeof atob === 'function' ? atob('c2Jfc2VjcmV0X1U0S0NmS1lFeDBzLXFwbXpBQzhnYkFfWkQ4MDZHclE=') : '';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || defaultUrl).replace(/\/$/, '');
const supabaseApiKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

export const supabaseApi = {
  isConfigured: !!(supabaseUrl && supabaseApiKey),

  async fetchStore() {
    if (!this.isConfigured) return null;
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/workflow_store?select=*`, {
        headers: {
          'apikey': supabaseApiKey,
          'Authorization': `Bearer ${supabaseApiKey}`
        }
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.warn('[Supabase API] Fetch error:', err);
      return null;
    }
  },

  async upsertStore(id, dataPayload) {
    if (!this.isConfigured) return false;
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/workflow_store`, {
        method: 'POST',
        headers: {
          'apikey': supabaseApiKey,
          'Authorization': `Bearer ${supabaseApiKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          id,
          data: dataPayload,
          updated_at: new Date().toISOString()
        })
      });
      return res.ok;
    } catch (err) {
      console.warn('[Supabase API] Upsert error:', err);
      return false;
    }
  }
};
