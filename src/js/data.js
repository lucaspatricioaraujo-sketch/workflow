/* ==========================================================================
   DATA STORE - SUPABASE REAL-TIME PERSISTENCE & LOCALSTORAGE FALLBACK
   ========================================================================== */

import { supabaseApi } from './supabaseClient.js';

const STORAGE_KEY = 'audiovisual_workflow_data_v2';
const CATEGORIES_KEY = 'audiovisual_categories_v2';
const CATEGORY_COLORS_KEY = 'audiovisual_category_colors_v2';

const DEFAULT_CATEGORIES = ['INSTA', 'REELS', 'TIKTOK', 'YOUTUBE', 'FOTO', 'CINE', 'STORIES'];
const DEFAULT_CATEGORY_COLORS = {
  'INSTA': '#FF2E93',
  'REELS': '#C084FC',
  'TIKTOK': '#00F2FE',
  'YOUTUBE': '#FF3344',
  'FOTO': '#34D399',
  'CINE': '#FBBF24',
  'STORIES': '#FF7700'
};

const INITIAL_DATA = [
  {
    id: 'item_01',
    code: '01',
    category: 'INSTAGRAM',
    stage: 'gravar',
    title: 'Conteúdo teste',
    subtitle: 'Reels • 9:16 • 4K',
    assignee: 'Lucas',
    status: 'atencao',
    priority: 'alta',
    dateShooting: '2026-08-24',
    timeShooting: '17:58',
    dateEditingDeadline: '2026-08-26',
    timeEditingDeadline: '17:58',
    datePosting: '2026-08-29',
    timePosting: '17:58',
    description: 'Anotação teste de briefing...',
    links: [],
    attachments: [],
    checklist: [],
    comments: []
  }
];

class DataStore {
  constructor() {
    this.listeners = [];
    this.items = [];
    this.categories = [];
    this.categoryColors = {};
    this.isSupabaseConnected = false;

    this.loadLocal();
    this.initSupabaseSync();
  }

  loadLocal() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.items = JSON.parse(saved);
      } else {
        this.items = [...INITIAL_DATA];
        this.saveLocal();
      }

      const savedCategories = localStorage.getItem(CATEGORIES_KEY);
      if (savedCategories) {
        this.categories = JSON.parse(savedCategories);
      } else {
        this.categories = [...DEFAULT_CATEGORIES];
        this.saveCategoriesLocal();
      }

      const savedColors = localStorage.getItem(CATEGORY_COLORS_KEY);
      if (savedColors) {
        this.categoryColors = JSON.parse(savedColors);
      } else {
        this.categoryColors = { ...DEFAULT_CATEGORY_COLORS };
        this.saveCategoryColorsLocal();
      }
    } catch (e) {
      console.error('Error loading local data:', e);
      this.items = [...INITIAL_DATA];
      this.categories = [...DEFAULT_CATEGORIES];
      this.categoryColors = { ...DEFAULT_CATEGORY_COLORS };
    }
  }

  async initSupabaseSync() {
    if (!supabaseApi.isConfigured) {
      console.log('[Supabase] Credenciais não configuradas.');
      return;
    }

    try {
      // 1. Busca dados no banco do Supabase ao iniciar (funciona 100% em janela anônima)
      const remoteRows = await supabaseApi.fetchStore();

      if (remoteRows && Array.isArray(remoteRows) && remoteRows.length > 0) {
        this.isSupabaseConnected = true;

        const itemsRow = remoteRows.find(r => r.id === 'items');
        const categoriesRow = remoteRows.find(r => r.id === 'categories');
        const colorsRow = remoteRows.find(r => r.id === 'category_colors');

        if (itemsRow && Array.isArray(itemsRow.data) && itemsRow.data.length > 0) {
          this.items = itemsRow.data;
          this.saveLocal();
        } else {
          await supabaseApi.upsertStore('items', this.items);
        }

        if (categoriesRow && Array.isArray(categoriesRow.data) && categoriesRow.data.length > 0) {
          this.categories = categoriesRow.data;
          this.saveCategoriesLocal();
        } else {
          await supabaseApi.upsertStore('categories', this.categories);
        }

        if (colorsRow && colorsRow.data) {
          this.categoryColors = colorsRow.data;
          this.saveCategoryColorsLocal();
        } else {
          await supabaseApi.upsertStore('category_colors', this.categoryColors);
        }

        this.notify();
      } else {
        // Tabela vazia no Supabase: inicializa com os dados atuais
        await supabaseApi.upsertStore('items', this.items);
        await supabaseApi.upsertStore('categories', this.categories);
        await supabaseApi.upsertStore('category_colors', this.categoryColors);
      }

      // 2. Polling contínuo a cada 3 segundos (garante sincronização perfeita em todos os computadores e janelas anônimas)
      setInterval(async () => {
        try {
          const pollRows = await supabaseApi.fetchStore();
          if (pollRows && Array.isArray(pollRows)) {
            const itemsRow = pollRows.find(r => r.id === 'items');
            const categoriesRow = pollRows.find(r => r.id === 'categories');
            const colorsRow = pollRows.find(r => r.id === 'category_colors');

            if (itemsRow && Array.isArray(itemsRow.data) && itemsRow.data.length > 0) {
              if (JSON.stringify(itemsRow.data) !== JSON.stringify(this.items)) {
                this.items = itemsRow.data;
                this.saveLocal();
                this.notify();
              }
            }

            if (categoriesRow && Array.isArray(categoriesRow.data) && categoriesRow.data.length > 0) {
              if (JSON.stringify(categoriesRow.data) !== JSON.stringify(this.categories)) {
                this.categories = categoriesRow.data;
                this.saveCategoriesLocal();
                this.notify();
              }
            }

            if (colorsRow && colorsRow.data) {
              if (JSON.stringify(colorsRow.data) !== JSON.stringify(this.categoryColors)) {
                this.categoryColors = colorsRow.data;
                this.saveCategoryColorsLocal();
                this.notify();
              }
            }
          }
        } catch (pollErr) {
          // Erro silencioso de polling
        }
      }, 3000);

    } catch (e) {
      console.warn('[Supabase] Exceção na sincronização:', e);
    }
  }

  async pushToSupabase(key, payloadData) {
    await supabaseApi.upsertStore(key, payloadData);
  }

  saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      this.notify();
    } catch (e) {
      console.error('Error saving local data:', e);
    }
  }

  saveCategoriesLocal() {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(this.categories));
      this.notify();
    } catch (e) {
      console.error('Error saving local categories:', e);
    }
  }

  saveCategoryColorsLocal() {
    try {
      localStorage.setItem(CATEGORY_COLORS_KEY, JSON.stringify(this.categoryColors));
      this.notify();
    } catch (e) {
      console.error('Error saving local category colors:', e);
    }
  }

  save() {
    this.saveLocal();
    this.pushToSupabase('items', this.items);
  }

  saveCategories() {
    this.saveCategoriesLocal();
    this.pushToSupabase('categories', this.categories);
  }

  saveCategoryColors() {
    this.saveCategoryColorsLocal();
    this.pushToSupabase('category_colors', this.categoryColors);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.items));
  }

  getAll() {
    return [...this.items];
  }

  getById(id) {
    return this.items.find(item => item.id === id);
  }

  getCategories() {
    return [...this.categories];
  }

  getCategoryColor(categoryName) {
    if (!categoryName) return null;
    return this.categoryColors[categoryName.toUpperCase()] || null;
  }

  setCategoryColor(categoryName, hexColor) {
    if (!categoryName) return;
    const formatted = categoryName.trim().toUpperCase();
    if (hexColor) {
      this.categoryColors[formatted] = hexColor;
    } else {
      delete this.categoryColors[formatted];
    }
    this.saveCategoryColors();
  }

  addCategory(categoryName, colorHex = null) {
    if (!categoryName) return false;
    const formatted = categoryName.trim().toUpperCase();
    if (!this.categories.includes(formatted)) {
      this.categories.push(formatted);
      if (colorHex) {
        this.categoryColors[formatted] = colorHex;
      }
      this.saveCategories();
      this.saveCategoryColors();
      return true;
    }
    return false;
  }

  removeCategory(categoryName) {
    this.categories = this.categories.filter(c => c !== categoryName);
    this.saveCategories();
  }

  create(newItem) {
    const nextCode = (this.items.length + 1).toString().padStart(2, '0');
    const item = {
      id: 'item_' + Date.now().toString(36),
      code: nextCode,
      category: newItem.category || (this.categories[0] || 'GERAL'),
      stage: newItem.stage || 'gravar',
      title: newItem.title || 'Novo Conteúdo Audiovisual',
      subtitle: newItem.subtitle || 'Reels • 9:16',
      assignee: newItem.assignee || 'Lucas',
      status: newItem.status || 'pendente',
      priority: newItem.priority || 'normal',
      dateShooting: newItem.dateShooting || '',
      timeShooting: newItem.timeShooting || '',
      dateEditingDeadline: newItem.dateEditingDeadline || '',
      timeEditingDeadline: newItem.timeEditingDeadline || '',
      datePosting: newItem.datePosting || '',
      timePosting: newItem.timePosting || '',
      description: newItem.description || '',
      links: newItem.links || [],
      attachments: newItem.attachments || [],
      checklist: newItem.checklist || [],
      comments: newItem.comments || []
    };

    this.items.unshift(item);
    this.save();
    return item;
  }

  update(id, updates) {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updates };
      this.save();
      return this.items[index];
    }
    return null;
  }

  updateStage(id, newStage) {
    let newStatus = 'pendente';
    if (newStage === 'concluido') newStatus = 'postado';
    return this.update(id, { stage: newStage, status: newStatus });
  }

  updateStatus(id, newStatus) {
    let newStage = undefined;
    if (newStatus === 'postado') newStage = 'concluido';
    return this.update(id, { status: newStatus, ...(newStage ? { stage: newStage } : {}) });
  }

  delete(id) {
    if (!id) return false;
    const initialCount = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    if (this.items.length < initialCount) {
      this.save();
      return true;
    }
    return false;
  }

  exportDataJson() {
    return JSON.stringify({
      version: '2.0',
      exportDate: new Date().toISOString(),
      categories: this.categories,
      items: this.items
    }, null, 2);
  }

  importDataJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.items)) {
        this.items = parsed.items;
        if (Array.isArray(parsed.categories)) {
          this.categories = parsed.categories;
        }
        this.save();
        this.saveCategories();
        return true;
      }
    } catch (e) {
      console.error('Import error:', e);
    }
    return false;
  }

  resetToDefault() {
    this.items = [...INITIAL_DATA];
    this.categories = [...DEFAULT_CATEGORIES];
    this.categoryColors = { ...DEFAULT_CATEGORY_COLORS };
    this.save();
    this.saveCategories();
    this.saveCategoryColors();
  }
}

export const dataStore = new DataStore();
if (typeof window !== 'undefined') {
  window.dataStore = dataStore;
}
