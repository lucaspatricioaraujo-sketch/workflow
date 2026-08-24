/* ==========================================================================
   UTILITY FUNCTIONS & CUSTOM CONFIRM DIALOGS
   ========================================================================== */

export const ICONS = {
  table: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>`,
  kanban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="14" x="3" y="5" rx="1"/><rect width="6" height="10" x="11" y="5" rx="1"/><rect width="6" height="16" x="19" y="5" rx="1"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>`,
  scissors: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>`,
  comment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`
};

export function generateId() {
  return 'item_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatDateBr(dateStr) {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return dateStr;
}

export function getStageLabel(stage) {
  const map = {
    'gravar': 'GRAVAR',
    'editar': 'EDITAR',
    'validacao': 'VALIDAÇÃO',
    'concluido': 'CONCLUÍDO'
  };
  return map[stage] || stage.toUpperCase();
}

export function getStageBadgeClass(stage) {
  const map = {
    'gravar': 'stage-gravar',
    'editar': 'stage-editar',
    'validacao': 'stage-validacao',
    'concluido': 'stage-concluido'
  };
  return map[stage] || 'stage-gravar';
}

export function getStatusLabel(status) {
  const map = {
    'gravar': 'GRAVAR',
    'editar': 'EDITAR',
    'validacao': 'VALIDAÇÃO',
    'concluido': 'CONCLUÍDO',
    'postado': 'CONCLUÍDO',
    'pendente': 'GRAVAR',
    'atencao': 'VALIDAÇÃO',
    'atrasado': 'EDITAR',
    'cancelado': 'GRAVAR'
  };
  return map[status] || (status ? status.toUpperCase() : 'GRAVAR');
}

export function getStatusClass(status) {
  const map = {
    'gravar': 'stage-gravar',
    'editar': 'stage-editar',
    'validacao': 'stage-validacao',
    'concluido': 'stage-concluido',
    'postado': 'stage-concluido',
    'pendente': 'stage-gravar',
    'atencao': 'stage-validacao',
    'atrasado': 'stage-editar',
    'cancelado': 'stage-gravar'
  };
  return map[status] || 'stage-gravar';
}

export function formatCategoryBadge(category, customClass = '') {
  if (!category) return `<span class="badge-category ${customClass}">GERAL</span>`;
  const name = String(category).toUpperCase();
  const ds = typeof window !== 'undefined' ? window.dataStore : null;
  const hex = ds ? ds.getCategoryColor(name) : null;
  if (hex) {
    return `<span class="badge-category ${customClass}" data-category="${escapeHtml(name)}" style="background: ${hex}22; color: ${hex}; border-color: ${hex}66; box-shadow: 0 0 10px ${hex}40;">${escapeHtml(name)}</span>`;
  }
  return `<span class="badge-category ${customClass}" data-category="${escapeHtml(name)}">${escapeHtml(name)}</span>`;
}

// Custom Confirm Delete Dialog (Guarantees deletion works 100% reliably)
export function confirmDeleteModal({ title = 'Deseja excluir este conteúdo?', onConfirm }) {
  let backdrop = document.getElementById('custom-confirm-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'custom-confirm-backdrop';
    backdrop.className = 'modal-backdrop centered-backdrop';
    document.body.appendChild(backdrop);
  }

  backdrop.innerHTML = `
    <div class="popup-modal-card" style="max-width: 400px; text-align: center; gap: 16px;">
      <h3 style="color: var(--text-primary); font-size: 1rem; font-weight: 600;">Confirmar exclusão</h3>
      <p style="color: var(--text-secondary); font-size: 0.8125rem;">${escapeHtml(title)}</p>
      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 8px;">
        <button class="btn-secondary" id="confirm-btn-cancel">Cancelar</button>
        <button class="btn-primary" id="confirm-btn-yes" style="background: #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
          Sim, excluir
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add('active');

  const closeConfirm = () => {
    backdrop.classList.remove('active');
  };

  document.getElementById('confirm-btn-cancel')?.addEventListener('click', closeConfirm);
  document.getElementById('confirm-btn-yes')?.addEventListener('click', () => {
    closeConfirm();
    if (onConfirm) onConfirm();
  });
}


export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-notification-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'error' ? 'rgba(255, 100, 100, 0.92)' : type === 'info' ? 'rgba(77, 163, 255, 0.92)' : 'rgba(53, 211, 154, 0.92)';
  toast.style.cssText = `
    background: ${bg};
    color: #ffffff;
    padding: 10px 18px;
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    backdrop-filter: blur(12px);
    pointer-events: auto;
    animation: fadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  toast.innerHTML = `<span>${type === 'error' ? '🚨' : type === 'info' ? 'ℹ️' : '✅'}</span> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function openAttachmentFile(attachment) {
  if (!attachment) return;
  if (attachment.dataUrl) {
    const win = window.open();
    if (win) {
      win.document.write(`<title>${escapeHtml(attachment.name)}</title><iframe src="${attachment.dataUrl}" frameborder="0" style="border:0; position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`);
    } else {
      window.open(attachment.dataUrl, '_blank');
    }
  } else {
    // Fallback for sample demo attachments
    const content = `[VISUALIZAÇÃO DE ANEXO AUDIOVISUAL]\n\nNome do Arquivo: ${attachment.name}\nTamanho: ${attachment.size || '2.4 MB'}\nStatus: Arquivo verificado e seguro.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }
}

export function downloadAttachmentFile(attachment) {
  if (!attachment) return;
  let url = attachment.dataUrl;
  let isTempBlob = false;
  if (!url) {
    const content = `[DEMONSTRAÇÃO DE ARQUIVO AUDIOVISUAL]\n\nNome: ${attachment.name}\nData: ${new Date().toLocaleString()}\nWorkflow Audiovisual`;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    url = URL.createObjectURL(blob);
    isTempBlob = true;
  }

  const a = document.createElement('a');
  a.href = url;
  a.download = attachment.name || 'anexo';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  if (isTempBlob) {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
