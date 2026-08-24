/* ==========================================================================
   APP MAIN CONTROLLER & STATE COORDINATOR (LOVABLE REPLICA & ENHANCEMENTS)
   ========================================================================== */

import { dataStore } from './data.js';
import { ICONS, escapeHtml, showToast, confirmDeleteModal, formatDateBr, formatCategoryBadge } from './utils.js';
import { renderTableView } from './views/tableView.js';
import { renderCalendarView, selectedCalendarDate } from './views/calendarView.js';
import { renderKanbanView } from './views/kanbanView.js';
import { openContentModal, closeContentModal } from './modal.js';

// Application State
const state = {
  currentView: 'table', // 'table', 'calendar', 'kanban'

  activeCategory: 'all',
  searchQuery: '',
  activeStatusFilter: null,
  selectedCalendarDay: null
};

// Initialize Application
export function initApp() {
  initTheme();
  setupEventListeners();
  startLiveClock();

  dataStore.subscribe(() => {
    updateTopMetrics();
    updateRightSummaryPanel();
    updateCategoryPills();
    renderCurrentView();
  });

  // Initial render
  updateTopMetrics();
  updateRightSummaryPanel();
  updateCategoryPills();
  renderCurrentView();
}

// Theme Manager (Dark / Light Mode Toggle)
function initTheme() {
  const savedTheme = localStorage.getItem('app-theme') || 'dark';
  applyTheme(savedTheme);

  const themeBtn = document.getElementById('btn-theme-toggle');
  themeBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('app-theme', nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const darkIcon = document.querySelector('.icon-theme-dark');
  const lightIcon = document.querySelector('.icon-theme-light');
  if (darkIcon && lightIcon) {
    if (theme === 'light') {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    } else {
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    }
  }
}


// Live Digital Clock & Top Date
function startLiveClock() {
  const clockEl = document.getElementById('live-digital-clock');
  const dateEl = document.getElementById('live-top-date');

  const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;

    if (dateEl) {
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      dateEl.textContent = `${now.getDate()} DE ${monthNames[now.getMonth()].toUpperCase()} DE ${now.getFullYear()}`;
    }
  };
  updateClock();
  setInterval(updateClock, 1000);
}

// Update Top Metrics Counter Cards
function updateTopMetrics() {
  const allItems = dataStore.getAll();

  const countConcluidos = allItems.filter(i => i.stage === 'concluido' || i.status === 'postado').length;
  const countAttention = allItems.filter(i => i.status === 'atencao').length;
  const countDelayed = allItems.filter(i => i.status === 'atrasado').length;
  const countPending = allItems.filter(i => i.status === 'pendente' || i.stage === 'gravar' || i.stage === 'editar').length;

  const elConcluidos = document.getElementById('metric-val-concluidos');
  const elAttention = document.getElementById('metric-val-attention');
  const elDelayed = document.getElementById('metric-val-delayed');
  const elPending = document.getElementById('metric-val-pending');

  if (elConcluidos) elConcluidos.textContent = countConcluidos;
  if (elAttention) elAttention.textContent = countAttention;
  if (elDelayed) elDelayed.textContent = countDelayed;
  if (elPending) elPending.textContent = countPending;
}

// Update Right Summary Panel (ETAPAS, RESUMO, LEGENDA, ATRASADOS AGORA)
function updateRightSummaryPanel() {
  const container = document.getElementById('right-panel-mount');
  if (!container) return;

  const allItems = dataStore.getAll();

  // 1. In Calendar View, show Selected Day Items Panel
  if (state.currentView === 'calendar') {
    const selDate = state.selectedCalendarDay || selectedCalendarDate;
    const dayItems = allItems.filter(i => 
      i.dateShooting === selDate || 
      i.dateEditingDeadline === selDate || 
      i.datePosting === selDate
    );

    const dayItemsHtml = dayItems.map(item => {
      let eventsBadges = [];
      if (item.dateShooting === selDate) {
        eventsBadges.push(`<span style="font-size:0.65rem; font-weight:700; color:#3B82F6; background:rgba(59,130,246,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(59,130,246,0.3);">🎥 GRAVAÇÃO ${item.timeShooting || ''}</span>`);
      }
      if (item.dateEditingDeadline === selDate) {
        eventsBadges.push(`<span style="font-size:0.65rem; font-weight:700; color:#FF3344; background:rgba(255,51,68,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(255,51,68,0.3);">✂️ ENTREGA ${item.timeEditingDeadline || ''}</span>`);
      }
      if (item.datePosting === selDate) {
        eventsBadges.push(`<span style="font-size:0.65rem; font-weight:700; color:#10B981; background:rgba(16,185,129,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(16,185,129,0.3);">🚀 POSTAGEM ${item.timePosting || ''}</span>`);
      }

      return `
        <div class="day-item-mini-card" data-action="edit" data-id="${item.id}" style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            ${formatCategoryBadge(item.category)}
            <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(item.assignee || 'Lucas')}</span>
          </div>
          <div style="font-weight:600; font-size:0.8125rem; color:var(--text-primary);">${escapeHtml(item.title)}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:2px;">
            ${eventsBadges.join('')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="summary-card">
        <h4 class="summary-card-title">CONTEÚDOS DO DIA (${formatDateBr(selDate)})</h4>
        ${dayItems.length > 0 ? `
          <div class="calendar-selected-day-panel">
            ${dayItemsHtml}
          </div>
        ` : `
          <div style="padding: 24px 10px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
            Nenhum conteúdo agendado para este dia.
          </div>
        `}
      </div>
    `;

    container.querySelectorAll('[data-action="edit"]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const item = dataStore.getById(id);
        if (item) {
          openContentModal({
            item,
            onSave: (updated) => { dataStore.update(id, updated); showToast('Conteúdo salvo com sucesso!'); },
            onDelete: (delId) => { dataStore.delete(delId); showToast('Conteúdo excluído!', 'info'); }
          });
        }
      });
    });
    return;
  }

  // 2. In Painel / Kanban View: ETAPAS, RESUMO, LEGENDA, ATRASADOS AGORA
  const countGravar = allItems.filter(i => (i.stage || 'gravar') === 'gravar').length;
  const countEditar = allItems.filter(i => i.stage === 'editar').length;
  const countValidacao = allItems.filter(i => i.stage === 'validacao').length;
  const countConcluido = allItems.filter(i => i.stage === 'concluido' || i.status === 'postado').length;

  const total = allItems.length;
  const percentPosted = total > 0 ? Math.round((countConcluido / total) * 100) : 0;

  const delayedItems = allItems.filter(i => i.status === 'atrasado');

  container.innerHTML = `
    <!-- ETAPAS Card -->
    <div class="summary-card">
      <h4 class="summary-card-title">ETAPAS</h4>
      <div class="etapas-list">
        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#06b6d4;"></span>
            <span style="color:#67e8f9;">GRAVAR</span>
          </div>
          <span class="etapa-item-count">${countGravar}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#a855f7;"></span>
            <span style="color:#d8b4fe;">EDITAR</span>
          </div>
          <span class="etapa-item-count">${countEditar}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#f59e0b;"></span>
            <span style="color:#fde047;">VALIDAÇÃO</span>
          </div>
          <span class="etapa-item-count">${countValidacao}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#10b981;"></span>
            <span style="color:#86efac;">CONCLUÍDO</span>
          </div>
          <span class="etapa-item-count">${countConcluido}</span>
        </div>
      </div>
    </div>

    <!-- RESUMO Card -->
    <div class="summary-card">
      <h4 class="summary-card-title">RESUMO</h4>
      <div class="resumo-stats">
        <div class="resumo-row">
          <span class="resumo-label">Total</span>
          <span class="resumo-val">${total}</span>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percentPosted}%;"></div>
        </div>
        <span class="progress-label-text">${percentPosted}% CONCLUÍDO</span>
      </div>
    </div>

    <!-- LEGENDA Card -->
    <div class="summary-card">
      <h4 class="summary-card-title">LEGENDA</h4>
      <div class="legend-list">
        <div class="legend-item"><span class="legend-dot dot-pending"></span><span>Pendente</span></div>
        <div class="legend-item"><span class="legend-dot dot-attention"></span><span>Atenção</span></div>
        <div class="legend-item"><span class="legend-dot dot-delayed"></span><span>Atrasado</span></div>
        <div class="legend-item"><span class="legend-dot dot-posted"></span><span>Postado</span></div>
        <div class="legend-item"><span class="legend-dot dot-cancelled"></span><span>Cancelado</span></div>
      </div>
    </div>

    <!-- ATRASADOS AGORA Card -->
    <div class="atrasados-now-box">
      <h4 class="atrasados-now-title">ATRASADOS AGORA</h4>
      <div class="atrasados-now-content">
        ${delayedItems.length > 0 ? `
          <div style="color:#ef4444; font-weight:800;">${delayedItems.length} conteúdos atrasados!</div>
        ` : `
          Nada atrasado. 🎯
        `}
      </div>
    </div>
  `;
}




// Filter Items Based on Current State
function getFilteredItems() {
  let items = dataStore.getAll();

  // 1. Separate Active Workflow vs Concluídos Tab vs Kanban View
  if (state.currentView === 'completed') {
    items = items.filter(i => i.stage === 'concluido' || i.status === 'postado');
  } else if (state.currentView === 'kanban') {
    // Keep all items including completed so the "CONCLUÍDO" column in Kanban displays finished cards!
  } else {
    // Active Workflow views (table, calendar) ONLY show active items
    items = items.filter(i => i.stage !== 'concluido' && i.status !== 'postado');
  }

  // 2. Filter by Category Pill
  if (state.activeCategory !== 'all') {
    items = items.filter(i => (i.category || 'GERAL').toUpperCase() === state.activeCategory);
  }

  // 3. Filter by Status Clicked from Metrics Card
  if (state.activeStatusFilter) {
    if (state.activeStatusFilter === 'pending') {
      items = items.filter(i => i.stage === 'gravar' || i.stage === 'editar');
    } else if (state.activeStatusFilter === 'atencao') {
      items = items.filter(i => i.stage === 'validacao');
    } else {
      items = items.filter(i => i.status === state.activeStatusFilter);
    }
  }

  // 4. Search Query
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    items = items.filter(i => 
      i.title.toLowerCase().includes(q) ||
      (i.assignee && i.assignee.toLowerCase().includes(q)) ||
      (i.description && i.description.toLowerCase().includes(q))
    );
  }

  return items;
}

// Render Active View
function renderCurrentView() {
  const container = document.getElementById('view-content-mount');
  if (!container) return;

  const titleEl = document.querySelector('.board-main-title');
  const subtitleEl = document.querySelector('.board-main-subtitle');

  if (state.currentView === 'completed') {
    if (titleEl) titleEl.textContent = 'Conteúdos Concluídos';
    if (subtitleEl) subtitleEl.textContent = 'Histórico de entregas e postagens finalizadas';
  } else {
    if (titleEl) titleEl.textContent = 'Fluxo de trabalho';
    if (subtitleEl) subtitleEl.textContent = 'Ordenado pelo prazo mais próximo';
  }

  const items = getFilteredItems();

  const handlers = {
    onEdit: (id) => {
      const item = dataStore.getById(id);
      if (item) {
        openContentModal({
          item,
          onSave: (updated) => {
            dataStore.update(id, updated);
            showToast('Conteúdo salvo com sucesso!');
          },
          onDelete: (delId) => {
            dataStore.delete(delId);
            showToast('Conteúdo excluído!', 'info');
          }
        });
      }
    },
    onAddWithDate: (dateStr) => {
      openContentModal({
        initialDate: dateStr,
        onSave: (newItem) => {
          dataStore.create(newItem);
          showToast('Novo conteúdo agendado!');
        }
      });
    },
    onAddWithStage: (stageStr) => {
      openContentModal({
        initialStage: stageStr,
        onSave: (newItem) => {
          dataStore.create(newItem);
          showToast(`Conteúdo adicionado em ${stageStr.toUpperCase()}!`);
        }
      });
    },
    onStageChange: (id, newStage) => {
      dataStore.updateStage(id, newStage);
      if (newStage === 'concluido') {
        showToast('Conteúdo concluído e movido para a aba Concluídos! 🚀', 'info');
      } else {
        showToast(`Conteúdo movido para ${newStage.toUpperCase()}!`, 'info');
      }
      renderCurrentView();
    },
    onStatusChange: (id, newStatus) => {
      dataStore.updateStatus(id, newStatus);
      showToast('Status atualizado!', 'info');
      renderCurrentView();
    },
    onDelete: (id) => {
      const item = dataStore.getById(id);
      confirmDeleteModal({
        title: `Deseja realmente excluir "${item?.title || 'este conteúdo'}"?`,
        onConfirm: () => {
          dataStore.delete(id);
          showToast('Conteúdo excluído com sucesso!', 'info');
        }
      });
    },
    onSelectDay: (dateStr) => {
      state.selectedCalendarDay = dateStr;
      updateRightSummaryPanel();
    }
  };

  switch (state.currentView) {
    case 'calendar':
      renderCalendarView(container, items, handlers);
      break;
    case 'kanban':
      renderKanbanView(container, items, handlers);
      break;
    case 'completed':
    case 'table':
    default:
      renderTableView(container, items, handlers);
      break;
  }

}

// Setup Event Listeners
function setupEventListeners() {
  // Sidebar Dock Navigation
  document.querySelectorAll('.dock-btn[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dock-btn[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentView = btn.getAttribute('data-view');
      updateRightSummaryPanel();
      renderCurrentView();
    });
  });

  // Search Input
  const searchInput = document.getElementById('global-search-input');
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCurrentView();
  });

  // Add Content button
  document.getElementById('btn-header-add-content')?.addEventListener('click', () => {
    openContentModal({
      onSave: (newItem) => {
        dataStore.create(newItem);
        showToast('Novo conteúdo criado com sucesso!');
      }
    });
  });

  // Settings Gear Button ⚙️ (Adicionar / Gerenciar Categorias)
  document.getElementById('btn-settings-gear')?.addEventListener('click', openCategoryManagerModal);

  // Metric Cards Filter Click
  const cardConcluidos = document.getElementById('card-metric-concluidos');
  cardConcluidos?.addEventListener('click', () => {
    document.querySelectorAll('.dock-btn[data-view]').forEach(b => b.classList.remove('active'));
    document.querySelector('.dock-btn[data-view="completed"]')?.classList.add('active');
    state.currentView = 'completed';
    updateRightSummaryPanel();
    renderCurrentView();
  });

  const metricCards = [
    { id: 'card-metric-attention', status: 'atencao' },
    { id: 'card-metric-delayed', status: 'atrasado' },
    { id: 'card-metric-pending', status: 'pending' }
  ];

  metricCards.forEach(({ id, status }) => {
    const cardEl = document.getElementById(id);
    cardEl?.addEventListener('click', () => {
      if (state.activeStatusFilter === status) {
        state.activeStatusFilter = null;
        cardEl.classList.remove('active');
      } else {
        metricCards.forEach(c => document.getElementById(c.id)?.classList.remove('active'));
        state.activeStatusFilter = status;
        cardEl.classList.add('active');
      }
      renderCurrentView();
    });
  });

  // Export / Backup
  document.getElementById('btn-export-data')?.addEventListener('click', () => {
    const jsonStr = dataStore.exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_workflow_audiovisual_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON baixado com sucesso!');
  });

  // Import Backup
  document.getElementById('btn-import-trigger')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const success = dataStore.importDataJson(evt.target.result);
          if (success) {
            showToast('Dados importados com sucesso!');
            updateCategoryPills();
          } else {
            showToast('Erro ao importar arquivo JSON.', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });

  // Reset to default
  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    confirmDeleteModal({
      title: 'Deseja restaurar os dados de exemplo padrão?',
      onConfirm: () => {
        dataStore.resetToDefault();
        updateCategoryPills();
        showToast('Dados restaurados ao padrão!', 'info');
      }
    });
  });

  // ESC key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeContentModal();
      document.getElementById('category-manager-backdrop')?.classList.remove('active');
    }
  });
}

// Render Dynamic Category Filter Pills
function updateCategoryPills() {
  const container = document.getElementById('category-pills-container');
  if (!container) return;

  const categories = dataStore.getCategories();

  const pillsHtml = `
    <button class="filter-pill ${state.activeCategory === 'all' ? 'active' : ''}" data-category="all">TODAS</button>
    ${categories.map(cat => {
      const color = dataStore.getCategoryColor(cat);
      const isActive = state.activeCategory === cat;
      const customStyle = color ? (isActive ? `style="background: ${color}33; color: ${color}; border-color: ${color}; box-shadow: 0 0 16px ${color}66;"` : `style="border-color: ${color}44; color: ${color};"`) : '';
      return `
        <button class="filter-pill ${isActive ? 'active' : ''}" data-category="${cat}" ${customStyle}>
          ${escapeHtml(cat)}
        </button>
      `;
    }).join('')}
    <button class="btn-add-category-pill" id="btn-add-category-trigger" title="Adicionar Nova Categoria">+ Categoria</button>
  `;

  container.innerHTML = pillsHtml;

  // Category pill clicks
  container.querySelectorAll('.filter-pill[data-category]').forEach(pill => {
    pill.addEventListener('click', () => {
      state.activeCategory = pill.getAttribute('data-category');
      updateCategoryPills();
      renderCurrentView();
    });
  });

  // Add Category Trigger
  document.getElementById('btn-add-category-trigger')?.addEventListener('click', openCategoryManagerModal);
}


// Category Manager Modal (⚙️ Settings e + Categoria com Cores Personalizadas)
function openCategoryManagerModal() {
  let backdrop = document.getElementById('category-manager-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'category-manager-backdrop';
    backdrop.className = 'modal-backdrop centered-backdrop';
    document.body.appendChild(backdrop);
  }

  const renderContent = () => {
    const categories = dataStore.getCategories();
    backdrop.innerHTML = `
      <div class="popup-modal-card" style="max-width: 520px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <h3 style="color:#ffffff; font-size:1.1rem; font-weight:800; display:flex; align-items:center; gap:8px;">
            ⚙️ Gerenciar Categorias & Cores
          </h3>
          <button class="modal-close-btn" id="cat-modal-close">✕</button>
        </div>

        <p style="font-size:0.78rem; color:var(--text-muted); margin-top:4px;">
          Escolha cores personalizadas para cada categoria (opcional). Clique no círculo de cor para alterar!
        </p>

        <!-- New Category Creation Input with Color Picker -->
        <div style="display:flex; gap:8px; align-items:center; background:rgba(255,255,255,0.02); padding:10px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <input type="color" id="cat-modal-new-color" value="#2563EB" style="width:34px; height:34px; border:none; background:transparent; cursor:pointer; padding:0;" title="Escolher cor da categoria" />
          <input type="text" id="cat-modal-input" class="form-control" placeholder="Nova Categoria (ex: PODCAST, VLOG)" style="flex:1;" />
          <button class="btn-primary" id="cat-modal-btn-add" style="white-space:nowrap;">+ Criar</button>
        </div>

        <!-- Categories List with Color Pickers -->
        <div style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto; margin-top:6px;">
          ${categories.map(c => {
            const currentColor = dataStore.getCategoryColor(c) || '#2563EB';
            return `
              <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:8px 14px; border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:10px;">
                  <input type="color" class="cat-color-input" data-name="${escapeHtml(c)}" value="${currentColor}" style="width:28px; height:28px; border:none; background:transparent; cursor:pointer; padding:0;" title="Mudar cor de ${escapeHtml(c)}" />
                  <span class="badge-category" data-category="${escapeHtml(c)}" style="background:${currentColor}22; color:${currentColor}; border-color:${currentColor}66;">${escapeHtml(c)}</span>
                </div>
                <button class="action-btn-mini delete-btn" data-action="remove-cat" data-name="${escapeHtml(c)}" title="Remover Categoria">
                  ${ICONS.trash}
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <div style="margin-top:12px; display:flex; justify-content:flex-end;">
          <button class="btn-primary" id="cat-modal-btn-done">Concluído</button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');

    const inputEl = document.getElementById('cat-modal-input');
    if (inputEl) inputEl.focus();

    const handleAdd = () => {
      const input = document.getElementById('cat-modal-input');
      const colorInput = document.getElementById('cat-modal-new-color');
      if (input && input.value.trim()) {
        const colorHex = colorInput ? colorInput.value : null;
        const success = dataStore.addCategory(input.value.trim(), colorHex);
        if (success) {
          showToast(`Categoria "${input.value.trim().toUpperCase()}" criada!`);
          updateCategoryPills();
          renderContent();
        } else {
          showToast('Esta categoria já existe.', 'info');
        }
      }
    };

    document.getElementById('cat-modal-close')?.addEventListener('click', () => backdrop.classList.remove('active'));
    document.getElementById('cat-modal-btn-done')?.addEventListener('click', () => backdrop.classList.remove('active'));
    document.getElementById('cat-modal-btn-add')?.addEventListener('click', handleAdd);

    inputEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAdd();
    });

    backdrop.querySelectorAll('.cat-color-input').forEach(picker => {
      picker.addEventListener('change', (e) => {
        const catName = picker.getAttribute('data-name');
        const newColor = e.target.value;
        dataStore.setCategoryColor(catName, newColor);
        showToast(`Cor da categoria "${catName}" atualizada!`);
        updateCategoryPills();
        renderContent();
      });
    });

    backdrop.querySelectorAll('[data-action="remove-cat"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const catName = btn.getAttribute('data-name');
        dataStore.removeCategory(catName);
        showToast(`Categoria "${catName}" removida!`, 'info');
        updateCategoryPills();
        renderContent();
      });
    });
  };

  renderContent();
}
