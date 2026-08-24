/* ==========================================================================
   TABLE VIEW — QUIET DEPTH
   ========================================================================== */

import { ICONS, escapeHtml, getStatusClass, getStatusLabel, getStageBadgeClass, getStageLabel, formatDateBr, formatCategoryBadge } from '../utils.js';

export function renderTableView(container, items, { onEdit, onDelete, onStatusChange }) {
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div style="padding: 60px 24px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;">🎬</div>
        <h3 style="color: var(--text-secondary); font-weight: 600; margin-bottom: 6px; font-size: 1rem;">Nenhum conteúdo encontrado</h3>
        <p style="font-size: 0.8125rem;">Ajuste os filtros ou clique em "+ Conteúdo" para adicionar.</p>
      </div>
    `;
    return;
  }

  const rowsHtml = items.map((item, index) => {
    const codeFormatted = item.code || (index + 1).toString().padStart(2, '0');
    const categoryBadgeHtml = formatCategoryBadge(item.category);
    const stageBadgeClass = getStageBadgeClass(item.stage || 'gravar');
    const stageName = getStageLabel(item.stage || 'gravar');
    const statusClass = getStatusClass(item.status);
    const statusText = getStatusLabel(item.status);

    const assignee = item.assignee || '—';
    const assigneeInitial = assignee !== '—' ? assignee.charAt(0).toUpperCase() : '?';

    // Format Data Column
    let datePrefix = 'GRAVAR';
    let dateVal = item.dateShooting || item.dateEditingDeadline || item.datePosting || '';
    let timeVal = item.timeShooting || item.timeEditingDeadline || item.timePosting || '';

    if (item.stage === 'editar') {
      datePrefix = 'ENTREGA';
      dateVal = item.dateEditingDeadline || item.dateShooting || '';
      timeVal = item.timeEditingDeadline || item.timeShooting || '';
    } else if (item.stage === 'concluido') {
      datePrefix = 'POSTAGEM';
      dateVal = item.datePosting || item.dateEditingDeadline || '';
      timeVal = item.timePosting || item.timeEditingDeadline || '';
    }

    const dataFormatted = `${datePrefix} ${formatDateBr(dateVal)}${timeVal ? ', ' + timeVal : ''}`;

    return `
      <tr data-id="${item.id}">
        <td>${codeFormatted}</td>
        <td>
          <div class="content-cell">
            <div class="content-top-row">
              ${categoryBadgeHtml}
              <span class="badge-stage ${stageBadgeClass}">
                <span class="stage-dot"></span>
                ${stageName}
              </span>
            </div>
            <div class="content-title" data-action="edit" data-id="${item.id}">
              ${escapeHtml(item.title)}
            </div>
            ${item.description ? `<div class="content-subtitle">${escapeHtml(item.description)}</div>` : ''}
          </div>
        </td>
        <td>
          <div class="assignee-cell">
            <div class="assignee-avatar">${assigneeInitial}</div>
            <span class="assignee-name">${escapeHtml(assignee)}</span>
          </div>
        </td>
        <td>
          <div class="table-data-cell">
            <span>${dataFormatted}</span>
          </div>
        </td>
        <td>
          <div class="status-dropdown-wrapper">
            <span class="status-pill ${stageBadgeClass}" data-action="edit" data-id="${item.id}" style="cursor: pointer;">
              ${stageName}
            </span>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="workflow-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Conteúdo</th>
            <th>Responsável</th>
            <th>Prazo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;

  // Attach edit event handlers
  container.querySelectorAll('[data-action="edit"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = el.getAttribute('data-id');
      if (onEdit) onEdit(id);
    });
  });
}
