/* ==========================================================================
   KANBAN VIEW - LOVABLE 4 STAGES
   ========================================================================== */

import { ICONS, escapeHtml, getStatusClass, getStatusLabel, formatDateBr, formatCategoryBadge } from '../utils.js';

const KANBAN_STAGES = [
  { id: 'gravar', title: 'GRAVAR', color: '#06b6d4' },
  { id: 'editar', title: 'EDITAR', color: '#a855f7' },
  { id: 'validacao', title: 'VALIDAÇÃO', color: '#f59e0b' },
  { id: 'concluido', title: 'CONCLUÍDO', color: '#10b981' }
];

export function renderKanbanView(container, items, { onEdit, onStageChange, onAddWithStage }) {
  const columnsHtml = KANBAN_STAGES.map(stage => {
    const stageItems = items.filter(item => (item.stage || 'gravar') === stage.id);

    const cardsHtml = stageItems.map(item => {
      const categoryBadgeHtml = formatCategoryBadge(item.category);
      const statusClass = getStatusClass(item.status);
      const statusText = getStatusLabel(item.status);

      let subDate = item.dateShooting ? formatDateBr(item.dateShooting) : '—';

      return `
        <div class="kanban-card" draggable="true" data-id="${item.id}" style="cursor: pointer;">
          <div class="kanban-card-top">
            ${categoryBadgeHtml}
          </div>

          <div class="kanban-card-title" data-action="edit" data-id="${item.id}">
            ${escapeHtml(item.title)}
          </div>

          <div class="kanban-card-subdate">
            ${subDate}
          </div>

          <div class="kanban-card-bottom">
            <span class="status-pill ${statusClass}" style="font-size: 0.65rem;">
              • ${statusText}
            </span>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="kanban-column" data-stage-id="${stage.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title-group">
            <span class="kanban-col-indicator" style="background: ${stage.color};"></span>
            <span class="kanban-col-title">${stage.title}</span>
          </div>
          <span class="kanban-col-count">${stageItems.length}</span>
        </div>

        <div class="kanban-cards-list" data-stage-id="${stage.id}">
          ${cardsHtml}
        </div>

        <button class="btn-kanban-col-add" data-action="add-stage" data-stage="${stage.id}">
          + ADICIONAR
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="kanban-board">
      ${columnsHtml}
    </div>
  `;

  // Attach card edit clicks on entire card
  let isDragging = false;

  container.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) return;
      const id = card.getAttribute('data-id');
      if (onEdit && id) onEdit(id);
    });

    card.addEventListener('dragstart', (e) => {
      isDragging = true;
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      setTimeout(() => { isDragging = false; }, 50);
    });
  });

  // Attach Add Stage clicks
  container.querySelectorAll('[data-action="add-stage"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage');
      if (onAddWithStage) onAddWithStage(stage);
    });
  });

  // Drag & Drop
  container.querySelectorAll('.kanban-cards-list').forEach(colList => {
    colList.addEventListener('dragover', (e) => {
      e.preventDefault();
      colList.style.background = 'rgba(139, 92, 246, 0.08)';
    });

    colList.addEventListener('dragleave', () => {
      colList.style.background = 'transparent';
    });

    colList.addEventListener('drop', (e) => {
      e.preventDefault();
      colList.style.background = 'transparent';
      const targetStageId = colList.getAttribute('data-stage-id');
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId && targetStageId) {
        if (onStageChange) {
          onStageChange(draggedId, targetStageId);
        }
      }
    });
  });
}
