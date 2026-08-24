/* ==========================================================================
   REFERENCES & LINKS VIEW COMPONENT
   ========================================================================== */

import { ICONS, escapeHtml } from '../utils.js';

export function renderReferencesView(container, items, { onEdit }) {
  // Collect all links across all items
  const allLinks = [];
  items.forEach(item => {
    if (item.links && item.links.length > 0) {
      item.links.forEach(l => {
        allLinks.push({
          ...l,
          contentId: item.id,
          contentTitle: item.title,
          project: item.project
        });
      });
    }
  });

  const linksGridHtml = allLinks.map(link => {
    let typeLabel = 'Referência';
    let typeColor = '#06b6d4';
    let iconSvg = ICONS.link;

    if (link.type === 'drive') {
      typeLabel = 'Google Drive';
      typeColor = '#38bdf8';
      iconSvg = ICONS.folder;
    } else if (link.type === 'frameio') {
      typeLabel = 'Frame.io';
      typeColor = '#a855f7';
      iconSvg = ICONS.video;
    } else if (link.type === 'youtube') {
      typeLabel = 'YouTube';
      typeColor = '#ef4444';
      iconSvg = ICONS.video;
    } else if (link.type === 'docs') {
      typeLabel = 'Google Docs / Roteiro';
      typeColor = '#3b82f6';
      iconSvg = ICONS.file;
    } else if (link.type === 'music') {
      typeLabel = 'Trilha Sonora';
      typeColor = '#10b981';
      iconSvg = ICONS.sparkles;
    }

    return `
      <div class="ref-card">
        <div class="ref-card-header">
          <span class="ref-type-badge" style="color: ${typeColor}; border: 1px solid ${typeColor}40;">
            ${typeLabel}
          </span>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${escapeHtml(link.project)}</span>
        </div>

        <div class="ref-card-title">${escapeHtml(link.title || 'Link de Apoio')}</div>
        <div class="ref-card-desc">Vinculado a: <strong>${escapeHtml(link.contentTitle)}</strong></div>

        <div class="ref-card-footer">
          <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" data-action="edit" data-id="${link.contentId}">
            Ver no Vídeo
          </button>
          <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="ref-link-btn">
            Abrir Link ${ICONS.externalLink}
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="references-hub-container">
      <!-- Quick Shortcuts Bar -->
      <div>
        <h4 class="hub-section-title" style="margin-bottom: 12px;">
          ${ICONS.folder} Pastas & Ferramentas Rápidas de Produção
        </h4>
        <div class="drive-shortcuts-bar">
          <a href="https://drive.google.com" target="_blank" rel="noopener" class="drive-shortcut-card">
            <div class="drive-icon-box" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
              ${ICONS.folder}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: #ffffff;">Google Drive</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Brutos & Entregáveis</div>
            </div>
          </a>

          <a href="https://app.frame.io" target="_blank" rel="noopener" class="drive-shortcut-card">
            <div class="drive-icon-box" style="background: rgba(168, 85, 247, 0.15); color: #a855f7;">
              ${ICONS.video}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: #ffffff;">Frame.io</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Validação de Cortes</div>
            </div>
          </a>

          <a href="https://docs.google.com" target="_blank" rel="noopener" class="drive-shortcut-card">
            <div class="drive-icon-box" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
              ${ICONS.file}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: #ffffff;">Google Docs</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Roteiros & Pautas</div>
            </div>
          </a>

          <a href="https://artlist.io" target="_blank" rel="noopener" class="drive-shortcut-card">
            <div class="drive-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">
              ${ICONS.sparkles}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 0.9rem; color: #ffffff;">Trilhas & FX</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">Artlist / Epidemic</div>
            </div>
          </a>
        </div>
      </div>

      <!-- Links Grid -->
      <div style="margin-top: 10px;">
        <h4 class="hub-section-title" style="margin-bottom: 12px;">
          ${ICONS.link} Central Consolidada de Links & Referências de Vídeos (${allLinks.length})
        </h4>

        ${allLinks.length > 0 ? `
          <div class="references-grid">
            ${linksGridHtml}
          </div>
        ` : `
          <div class="glass-panel" style="padding: 32px; text-align: center; color: var(--text-muted);">
            Nenhum link ou referência cadastrado ainda. Adicione links dentro de cada conteúdo!
          </div>
        `}
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (onEdit) onEdit(id);
    });
  });
}
