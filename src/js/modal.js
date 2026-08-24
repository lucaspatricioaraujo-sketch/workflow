/* ==========================================================================
   MODAL COMPONENT - SIDE DRAWER (EXACT LOVABLE PRINT 2 MATCH)
   ========================================================================== */

import { ICONS, escapeHtml, generateId, formatDateBr, confirmDeleteModal, formatCategoryBadge, openAttachmentFile, downloadAttachmentFile, showToast } from './utils.js';
import { dataStore } from './data.js';

let activeItem = null;
let isEditMode = false;
let onSaveCallback = null;
let onDeleteCallback = null;

export function openContentModal({ item = null, initialDate = '', initialStage = 'gravar', onSave, onDelete }) {
  onSaveCallback = onSave;
  onDeleteCallback = onDelete;
  isEditMode = !item; // New items start in edit mode directly

  if (item) {
    activeItem = JSON.parse(JSON.stringify(item));
  } else {
    const categories = dataStore.getCategories();
    activeItem = {
      id: null,
      title: 'Novo Conteúdo',
      subtitle: 'Reels • 9:16',
      category: categories[0] || 'INSTA',
      stage: initialStage,
      status: 'atencao',
      assignee: 'Lucas',
      priority: 'alta',
      dateShooting: initialDate || '',
      timeShooting: '17:58',
      dateEditingDeadline: initialDate || '',
      timeEditingDeadline: '17:58',
      datePosting: initialDate || '',
      timePosting: '17:58',
      description: 'Anotação teste de briefing...',
      links: [],
      attachments: [],
      checklist: [],
      comments: []
    };
  }

  renderModalHtml();
  const backdrop = document.getElementById('content-modal-backdrop');
  if (backdrop) backdrop.classList.add('active');
}

export function closeContentModal() {
  const backdrop = document.getElementById('content-modal-backdrop');
  if (backdrop) backdrop.classList.remove('active');
  activeItem = null;
}

function renderModalHtml() {
  let backdrop = document.getElementById('content-modal-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'content-modal-backdrop';
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);
  }

  const categories = dataStore.getCategories();

  backdrop.innerHTML = `
    <div class="modal-container">
      <!-- Drawer Header -->
      <div class="modal-header">
        <div style="flex: 1;">
          <div class="modal-badges-row">
            ${formatCategoryBadge(activeItem.category || 'INSTA')}
            <span class="status-pill status-attention">• ${escapeHtml((activeItem.status || 'ATENÇÃO').toUpperCase())}</span>
          </div>

          ${isEditMode ? `
            <input type="text" id="modal-field-title" class="form-control" value="${escapeHtml(activeItem.title)}" placeholder="Título do Conteúdo" style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;" />
            <input type="text" id="modal-field-subtitle" class="form-control" value="${escapeHtml(activeItem.subtitle || '')}" placeholder="Subtítulo (Ex: Reels • 9:16)" style="font-size: 0.8rem;" />
          ` : `
            <h2 class="modal-title-text">${escapeHtml(activeItem.title)}</h2>
            <div class="modal-subtitle-text">${escapeHtml(activeItem.subtitle || '')}</div>
          `}
        </div>

        <div class="modal-actions-top">
          <button class="modal-icon-btn" id="modal-btn-toggle-edit" title="${isEditMode ? 'Visualizar' : 'Editar Conteúdo'}">
            ${ICONS.edit}
          </button>
          <button class="modal-icon-btn modal-delete-trigger" id="modal-btn-delete-item" title="Excluir Conteúdo">
            ${ICONS.trash}
          </button>
          <button class="modal-close-btn" id="modal-btn-close">✕</button>
        </div>
      </div>

      <!-- Drawer Body (Scrollable Details) -->
      <div class="modal-body-scroll">

        <!-- Stage selector pills -->
        <div class="drawer-stage-selector">
          <label class="drawer-label">ETAPA DO CONTEÚDO</label>
          <div class="stage-pills-grid">
            <button class="stage-select-pill ${activeItem.stage === 'gravar' ? 'active' : ''}" data-stage="gravar">
              🎥 GRAVAR
            </button>
            <button class="stage-select-pill ${activeItem.stage === 'editar' ? 'active' : ''}" data-stage="editar">
              ✂️ EDITAR
            </button>
            <button class="stage-select-pill ${activeItem.stage === 'validacao' ? 'active' : ''}" data-stage="validacao">
              👁️ VALIDAÇÃO
            </button>
            <button class="stage-select-pill ${activeItem.stage === 'concluido' ? 'active' : ''}" data-stage="concluido">
              🚀 CONCLUÍDO
            </button>
          </div>
        </div>

        <!-- Details Form / Fields Grid -->
        <div class="drawer-fields-grid">
          <div class="form-group">
            <label class="drawer-label">CATEGORIA</label>
            ${isEditMode ? `
              <select id="modal-field-category" class="form-control">
                ${categories.map(c => `
                  <option value="${escapeHtml(c)}" ${activeItem.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>
                `).join('')}
              </select>
            ` : `
              <div class="readonly-field-val">${escapeHtml(activeItem.category || 'INSTA')}</div>
            `}
          </div>

          <div class="form-group">
            <label class="drawer-label">RESPONSÁVEL</label>
            ${isEditMode ? `
              <input type="text" id="modal-field-assignee" class="form-control" value="${escapeHtml(activeItem.assignee || 'Lucas')}" />
            ` : `
              <div class="readonly-field-val">${escapeHtml(activeItem.assignee || 'Lucas')}</div>
            `}
          </div>

          <!-- Cronograma de Datas -->
          <div class="form-group full-width">
            <label class="drawer-label">CRONOGRAMA DE DATAS</label>
            <div class="schedule-dates-row">
              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#3B82F6;">🎥 GRAVAÇÃO</span>
                ${isEditMode ? `
                  <input type="date" id="modal-field-dateShooting" class="form-control" value="${activeItem.dateShooting || ''}" />
                  <input type="time" id="modal-field-timeShooting" class="form-control" value="${activeItem.timeShooting || '17:58'}" style="margin-top:4px;" />
                ` : `
                  <div class="schedule-val-text">${formatDateBr(activeItem.dateShooting)} ${activeItem.timeShooting ? ', ' + activeItem.timeShooting : ''}</div>
                `}
              </div>

              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#FF3344;">✂️ ENTREGA DA EDIÇÃO</span>
                ${isEditMode ? `
                  <input type="date" id="modal-field-dateEditingDeadline" class="form-control" value="${activeItem.dateEditingDeadline || ''}" />
                  <input type="time" id="modal-field-timeEditingDeadline" class="form-control" value="${activeItem.timeEditingDeadline || '17:58'}" style="margin-top:4px;" />
                ` : `
                  <div class="schedule-val-text">${formatDateBr(activeItem.dateEditingDeadline)} ${activeItem.timeEditingDeadline ? ', ' + activeItem.timeEditingDeadline : ''}</div>
                `}
              </div>

              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#10B981;">🚀 POSTAGEM</span>
                ${isEditMode ? `
                  <input type="date" id="modal-field-datePosting" class="form-control" value="${activeItem.datePosting || ''}" />
                  <input type="time" id="modal-field-timePosting" class="form-control" value="${activeItem.timePosting || '17:58'}" style="margin-top:4px;" />
                ` : `
                  <div class="schedule-val-text">${formatDateBr(activeItem.datePosting)} ${activeItem.timePosting ? ', ' + activeItem.timePosting : ''}</div>
                `}
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label class="drawer-label">DESCRIÇÃO E BRIEFING</label>
            ${isEditMode ? `
              <textarea id="modal-field-description" class="form-control" rows="3">${escapeHtml(activeItem.description || '')}</textarea>
            ` : `
              <div class="readonly-field-val textarea-readonly">${escapeHtml(activeItem.description || 'Nenhum detalhe adicional.')}</div>
            `}
          </div>
        </div>

        <!-- Links e Referências -->
        <div>
          <h4 class="drawer-section-title">LINKS DE REFERÊNCIA</h4>
          <div class="drawer-links-list">
            ${activeItem.links.map(l => `
              <div class="drawer-link-item">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="color:var(--accent); font-size:0.6875rem; font-weight:600;">↪ ${escapeHtml(l.title || 'Referência')}</span>
                  <a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="drawer-link-url">${escapeHtml(l.url)}</a>
                </div>
                <button class="action-btn-mini delete-btn" data-action="remove-link" data-link-id="${l.id}">
                  ${ICONS.trash}
                </button>
              </div>
            `).join('')}
          </div>

          <div class="drawer-add-link-row">
            <input type="text" id="new-link-title" class="form-control" placeholder="Rótulo (ex: Drive)" style="flex: 1; min-width: 0;" />
            <input type="url" id="new-link-url" class="form-control" placeholder="https://" style="flex: 1.2; min-width: 0;" />
            <button class="btn-primary" id="btn-add-link">+ Link</button>
          </div>
        </div>

        <!-- Anexos com Opções de Abrir e Baixar -->
        <div>
          <h4 class="drawer-section-title">ANEXOS (${activeItem.attachments.length})</h4>
          <div class="drawer-links-list">
            ${activeItem.attachments.length > 0 ? activeItem.attachments.map(a => `
              <div class="drawer-link-item" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1; min-width:0;" data-action="open-attachment" data-att-id="${a.id}" title="Clique para abrir ${escapeHtml(a.name)}">
                  <span style="color:var(--accent); font-size:0.9rem;">${ICONS.file}</span>
                  <span style="font-size:0.8rem; font-weight:600; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                    ${escapeHtml(a.name)}
                  </span>
                  <span style="font-size:0.6875rem; color:var(--text-muted); font-family:var(--font-mono);">(${escapeHtml(a.size || '1.0 MB')})</span>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <button class="action-btn-mini" data-action="download-attachment" data-att-id="${a.id}" title="Baixar Arquivo" style="color:var(--accent);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                  <button class="action-btn-mini delete-btn" data-action="remove-attachment" data-att-id="${a.id}" title="Remover Anexo">
                    ${ICONS.trash}
                  </button>
                </div>
              </div>
            `).join('') : `
              <div style="font-size:0.75rem; color:var(--text-muted); padding:8px 0;">Nenhum anexo adicionado ainda.</div>
            `}
          </div>

          <div style="margin-top: 10px;">
            <button class="btn-secondary" id="btn-trigger-upload" style="width:100%; justify-content:center;">
              📎 Anexar arquivo
            </button>
            <input type="file" id="modal-file-input" style="display:none;" multiple />
          </div>
        </div>

        <!-- Comentários / Chat de Validação -->
        <div class="drawer-chat-section">
          <h4 class="drawer-section-title">COMENTÁRIOS E HISTÓRICO DE AJUSTES</h4>

          <div class="chat-feed-container">
            ${activeItem.comments && activeItem.comments.length > 0 ? activeItem.comments.map(cm => {
              const isMe = cm.author === 'Você' || cm.author === 'Lucas';
              const initial = cm.author ? cm.author.charAt(0).toUpperCase() : 'U';
              return `
                <div class="chat-msg-row ${isMe ? 'chat-msg-me' : 'chat-msg-other'}">
                  <div class="chat-avatar">${initial}</div>
                  <div class="chat-bubble">
                    <div class="chat-bubble-header">
                      <span class="chat-author-name">${escapeHtml(cm.author)}</span>
                      <span class="chat-time-stamp">${escapeHtml(cm.time || '')}</span>
                    </div>
                    <div class="chat-bubble-body">${escapeHtml(cm.text)}</div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="chat-empty-state">
                Nenhum comentário registrado ainda. Envie uma mensagem ou nota de alinhamento abaixo.
              </div>
            `}
          </div>

          <div class="chat-input-wrapper">
            <input type="text" id="new-comment-input" class="form-control" placeholder="Escreva uma mensagem ou ajuste..." />
            <button class="btn-chat-send" id="btn-send-comment" title="Enviar mensagem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>

      </div>

      <!-- Drawer Footer -->
      <div class="modal-footer">
        <button class="btn-secondary" id="modal-btn-cancel">Fechar</button>
        <button class="btn-primary" id="modal-btn-save">Salvar Alterações</button>
      </div>
    </div>
  `;

  attachModalEvents();
}

function attachModalEvents() {
  document.getElementById('modal-btn-close')?.addEventListener('click', closeContentModal);
  document.getElementById('modal-btn-cancel')?.addEventListener('click', closeContentModal);

  // Toggle edit mode
  document.getElementById('modal-btn-toggle-edit')?.addEventListener('click', () => {
    isEditMode = !isEditMode;
    renderModalHtml();
  });

  // Stage select pills
  document.querySelectorAll('.stage-select-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeItem.stage = pill.getAttribute('data-stage');
      renderModalHtml();
    });
  });

  // Add Link (Button click or Enter key)
  const submitLink = () => {
    const titleInput = document.getElementById('new-link-title');
    const urlInput = document.getElementById('new-link-url');
    if (urlInput && urlInput.value.trim()) {
      activeItem.links.push({
        id: generateId(),
        title: titleInput?.value.trim() || 'Referência',
        url: urlInput.value.trim(),
        type: 'reference'
      });
      renderModalHtml();
    }
  };

  document.getElementById('btn-add-link')?.addEventListener('click', submitLink);
  const onLinkInputEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitLink();
    }
  };
  document.getElementById('new-link-title')?.addEventListener('keydown', onLinkInputEnter);
  document.getElementById('new-link-url')?.addEventListener('keydown', onLinkInputEnter);

  // Remove Link
  document.querySelectorAll('[data-action="remove-link"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const linkId = btn.getAttribute('data-link-id');
      activeItem.links = activeItem.links.filter(l => l.id !== linkId);
      renderModalHtml();
    });
  });

  // Open Attachment (Ao clicar no nome do anexo)
  document.querySelectorAll('[data-action="open-attachment"]').forEach(el => {
    el.addEventListener('click', () => {
      const attId = el.getAttribute('data-att-id');
      const att = activeItem.attachments.find(a => a.id === attId);
      if (att) {
        openAttachmentFile(att);
        showToast(`Abrindo "${att.name}"...`, 'info');
      }
    });
  });

  // Download Attachment (Ao clicar no ícone de download)
  document.querySelectorAll('[data-action="download-attachment"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const attId = btn.getAttribute('data-att-id');
      const att = activeItem.attachments.find(a => a.id === attId);
      if (att) {
        downloadAttachmentFile(att);
        showToast(`Download de "${att.name}" iniciado!`);
      }
    });
  });

  // File Upload
  const fileInput = document.getElementById('modal-file-input');
  document.getElementById('btn-trigger-upload')?.addEventListener('click', () => fileInput?.click());
  fileInput?.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let loadedCount = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (evt) => {
          activeItem.attachments.push({
            id: generateId(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: file.name.split('.').pop(),
            dataUrl: evt.target.result
          });
          loadedCount++;
          if (loadedCount === files.length) {
            renderModalHtml();
            showToast(`${files.length} arquivo(s) anexado(s)!`);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });

  // Remove Attachment
  document.querySelectorAll('[data-action="remove-attachment"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const attId = btn.getAttribute('data-att-id');
      activeItem.attachments = activeItem.attachments.filter(a => a.id !== attId);
      renderModalHtml();
    });
  });

  // Add Comment / Send Chat Message
  const submitComment = () => {
    const input = document.getElementById('new-comment-input');
    if (input && input.value.trim()) {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      activeItem.comments.push({
        id: generateId(),
        author: 'Você',
        text: input.value.trim(),
        time: timeStr
      });
      renderModalHtml();
    }
  };

  document.getElementById('btn-send-comment')?.addEventListener('click', submitComment);
  document.getElementById('new-comment-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitComment();
    }
  });

  // Excluir Conteúdo (Fix 100% funcional com dialog customizado!)
  document.getElementById('modal-btn-delete')?.addEventListener('click', () => {
    if (!activeItem.id) return;
    confirmDeleteModal({
      title: `Deseja realmente excluir "${activeItem.title}"?`,
      onConfirm: () => {
        if (onDeleteCallback && activeItem.id) {
          onDeleteCallback(activeItem.id);
        }
        closeContentModal();
      }
    });
  });

  // Save
  document.getElementById('modal-btn-save')?.addEventListener('click', () => {
    if (isEditMode) {
      activeItem.title = document.getElementById('modal-field-title')?.value.trim() || activeItem.title;
      activeItem.subtitle = document.getElementById('modal-field-subtitle')?.value.trim() || activeItem.subtitle;
      activeItem.category = document.getElementById('modal-field-category')?.value || activeItem.category;
      activeItem.description = document.getElementById('modal-field-desc')?.value || activeItem.description;

      activeItem.dateShooting = document.getElementById('modal-field-date-shooting')?.value || activeItem.dateShooting;
      activeItem.timeShooting = document.getElementById('modal-field-time-shooting')?.value || activeItem.timeShooting;
      activeItem.dateEditingDeadline = document.getElementById('modal-field-date-editing')?.value || activeItem.dateEditingDeadline;
      activeItem.timeEditingDeadline = document.getElementById('modal-field-time-editing')?.value || activeItem.timeEditingDeadline;
      activeItem.datePosting = document.getElementById('modal-field-date-posting')?.value || activeItem.datePosting;
      activeItem.timePosting = document.getElementById('modal-field-time-posting')?.value || activeItem.timePosting;
    }

    if (onSaveCallback) {
      onSaveCallback(activeItem);
    }
    closeContentModal();
  });
}
