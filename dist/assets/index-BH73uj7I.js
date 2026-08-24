(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerPolicy&&(r.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?r.credentials="include":l.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(l){if(l.ep)return;l.ep=!0;const r=a(l);fetch(l.href,r)}})();const Z="audiovisual_workflow_data_v2",W="audiovisual_categories_v2",tt="audiovisual_category_colors_v2",q=["INSTA","REELS","TIKTOK","YOUTUBE","FOTO","CINE","STORIES"],z={INSTA:"#FF2E93",REELS:"#C084FC",TIKTOK:"#00F2FE",YOUTUBE:"#FF3344",FOTO:"#34D399",CINE:"#FBBF24",STORIES:"#FF7700"},H=[{id:"item_01",code:"01",category:"INSTA",stage:"gravar",title:"Reels | Teste de Conteúdo",subtitle:"Reels • 9:16 • 4K",assignee:"Lucas",status:"atencao",priority:"alta",dateShooting:"2026-08-24",timeShooting:"17:58",dateEditingDeadline:"2026-08-26",timeEditingDeadline:"17:58",datePosting:"2026-08-29",timePosting:"17:58",description:"Anotação teste de produção e briefing de vídeo.",links:[{id:"l1",title:"Referência Visual",url:"https://instagram.com/reels/exemplo",type:"reference"}],attachments:[{id:"a1",name:"ChatGPT Image 13 de ago. de 2026.png",size:"2.4 MB",type:"image"}],checklist:[{id:"c1",text:"Captação de imagem concluída",done:!0},{id:"c2",text:"Primeiro corte e montagem",done:!1}],comments:[{id:"cm1",author:"Lucas",text:"Anotação teste registrada.",time:"17:58"}]},{id:"item_02",code:"02",category:"REELS",stage:"editar",title:"Corrida | Mini Highlight",subtitle:"Reels • Legenda Dinâmica",assignee:"Stephany",status:"pendente",priority:"media",dateShooting:"2026-08-23",timeShooting:"10:00",dateEditingDeadline:"2026-08-24",timeEditingDeadline:"14:00",datePosting:"2026-08-25",timePosting:"18:00",description:"Vídeo rápido de melhores momentos.",links:[],attachments:[],checklist:[],comments:[]},{id:"item_03",code:"03",category:"YOUTUBE",stage:"validacao",title:"Vídeo Institucional | Cobertura",subtitle:"Vídeo Cine • 16:9 • 4K",assignee:"Lucas",status:"atencao",priority:"alta",dateShooting:"2026-08-22",timeShooting:"14:00",dateEditingDeadline:"2026-08-24",timeEditingDeadline:"18:00",datePosting:"2026-08-28",timePosting:"19:00",description:"Aguardando validação da diretoria.",links:[{id:"l2",title:"Prévia Frame.io",url:"https://frame.io/v/corte-v1",type:"frameio"}],attachments:[],checklist:[],comments:[]},{id:"item_04",code:"04",category:"FOTO",stage:"concluido",title:"Post Fotos | Bastidores",subtitle:"Carrossel • 4:5 • 10 Fotos",assignee:"Stephany",status:"postado",priority:"normal",dateShooting:"2026-08-21",timeShooting:"09:00",dateEditingDeadline:"2026-08-22",timeEditingDeadline:"12:00",datePosting:"2026-08-23",timePosting:"10:00",description:"Carrossel postado no feed oficial.",links:[],attachments:[],checklist:[],comments:[]}];class st{constructor(){this.listeners=[],this.load()}load(){try{const t=localStorage.getItem(Z);t?this.items=JSON.parse(t):(this.items=[...H],this.save());const a=localStorage.getItem(W);a?this.categories=JSON.parse(a):(this.categories=[...q],this.saveCategories());const o=localStorage.getItem(tt);o?this.categoryColors=JSON.parse(o):(this.categoryColors={...z},this.saveCategoryColors())}catch(t){console.error("Error loading data:",t),this.items=[...H],this.categories=[...q],this.categoryColors={...z}}}subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(a=>a!==t)}}notify(){this.listeners.forEach(t=>t(this.items))}getAll(){return[...this.items]}getById(t){return this.items.find(a=>a.id===t)}getCategories(){return[...this.categories]}save(){try{localStorage.setItem(Z,JSON.stringify(this.items)),this.notify()}catch(t){console.error("Error saving data:",t)}}saveCategories(){try{localStorage.setItem(W,JSON.stringify(this.categories)),this.notify()}catch(t){console.error("Error saving categories:",t)}}saveCategoryColors(){try{localStorage.setItem(tt,JSON.stringify(this.categoryColors)),this.notify()}catch(t){console.error("Error saving category colors:",t)}}getCategoryColor(t){return t&&this.categoryColors[t.toUpperCase()]||null}setCategoryColor(t,a){if(!t)return;const o=t.trim().toUpperCase();a?this.categoryColors[o]=a:delete this.categoryColors[o],this.saveCategoryColors()}addCategory(t,a=null){if(!t)return!1;const o=t.trim().toUpperCase();return this.categories.includes(o)?!1:(this.categories.push(o),a&&(this.categoryColors[o]=a),this.saveCategories(),this.saveCategoryColors(),!0)}removeCategory(t){this.categories=this.categories.filter(a=>a!==t),this.saveCategories()}create(t){const a=(this.items.length+1).toString().padStart(2,"0"),o={id:"item_"+Date.now().toString(36),code:a,category:t.category||this.categories[0]||"GERAL",stage:t.stage||"gravar",title:t.title||"Novo Conteúdo Audiovisual",subtitle:t.subtitle||"Reels • 9:16",assignee:t.assignee||"Lucas",status:t.status||"pendente",priority:t.priority||"normal",dateShooting:t.dateShooting||"",timeShooting:t.timeShooting||"",dateEditingDeadline:t.dateEditingDeadline||"",timeEditingDeadline:t.timeEditingDeadline||"",datePosting:t.datePosting||"",timePosting:t.timePosting||"",description:t.description||"",links:t.links||[],attachments:t.attachments||[],checklist:t.checklist||[],comments:t.comments||[]};return this.items.unshift(o),this.save(),o}update(t,a){const o=this.items.findIndex(l=>l.id===t);return o!==-1?(this.items[o]={...this.items[o],...a},this.save(),this.items[o]):null}updateStage(t,a){let o="pendente";return a==="concluido"&&(o="postado"),this.update(t,{stage:a,status:o})}updateStatus(t,a){let o;return a==="postado"&&(o="concluido"),this.update(t,{status:a,...o?{stage:o}:{}})}delete(t){if(!t)return!1;const a=this.items.length;return this.items=this.items.filter(o=>o.id!==t),this.items.length<a?(this.save(),!0):!1}exportDataJson(){return JSON.stringify({version:"2.0",exportDate:new Date().toISOString(),categories:this.categories,items:this.items},null,2)}importDataJson(t){try{const a=JSON.parse(t);if(Array.isArray(a.items))return this.items=a.items,Array.isArray(a.categories)&&(this.categories=a.categories),this.save(),this.saveCategories(),!0}catch(a){console.error("Import error:",a)}return!1}resetToDefault(){this.items=[...H],this.categories=[...q],this.categoryColors={...z},this.save(),this.saveCategories(),this.saveCategoryColors()}}const y=new st;typeof window<"u"&&(window.dataStore=y);const T={file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>',trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'};function _(){return"item_"+Date.now().toString(36)+Math.random().toString(36).substring(2,6)}function g(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function P(e){if(!e)return"—";const t=e.split("-");return t.length===3?`${t[2]}/${t[1]}`:e}function dt(e){return{gravar:"GRAVAR",editar:"EDITAR",validacao:"VALIDAÇÃO",concluido:"CONCLUÍDO"}[e]||e.toUpperCase()}function lt(e){return{gravar:"stage-gravar",editar:"stage-editar",validacao:"stage-validacao",concluido:"stage-concluido"}[e]||"stage-gravar"}function ot(e){return{gravar:"GRAVAR",editar:"EDITAR",validacao:"VALIDAÇÃO",concluido:"CONCLUÍDO",postado:"CONCLUÍDO",pendente:"GRAVAR",atencao:"VALIDAÇÃO",atrasado:"EDITAR",cancelado:"GRAVAR"}[e]||(e?e.toUpperCase():"GRAVAR")}function nt(e){return{gravar:"stage-gravar",editar:"stage-editar",validacao:"stage-validacao",concluido:"stage-concluido",postado:"stage-concluido",pendente:"stage-gravar",atencao:"stage-validacao",atrasado:"stage-editar",cancelado:"stage-gravar"}[e]||"stage-gravar"}function G(e,t=""){if(!e)return`<span class="badge-category ${t}">GERAL</span>`;const a=String(e).toUpperCase(),o=typeof window<"u"?window.dataStore:null,l=o?o.getCategoryColor(a):null;return l?`<span class="badge-category ${t}" data-category="${g(a)}" style="background: ${l}22; color: ${l}; border-color: ${l}66; box-shadow: 0 0 10px ${l}40;">${g(a)}</span>`:`<span class="badge-category ${t}" data-category="${g(a)}">${g(a)}</span>`}function K({title:e="Deseja excluir este conteúdo?",onConfirm:t}){var l,r;let a=document.getElementById("custom-confirm-backdrop");a||(a=document.createElement("div"),a.id="custom-confirm-backdrop",a.className="modal-backdrop centered-backdrop",document.body.appendChild(a)),a.innerHTML=`
    <div class="popup-modal-card" style="max-width: 400px; text-align: center; gap: 16px;">
      <h3 style="color: var(--text-primary); font-size: 1rem; font-weight: 600;">Confirmar exclusão</h3>
      <p style="color: var(--text-secondary); font-size: 0.8125rem;">${g(e)}</p>
      <div style="display: flex; gap: 10px; justify-content: center; margin-top: 8px;">
        <button class="btn-secondary" id="confirm-btn-cancel">Cancelar</button>
        <button class="btn-primary" id="confirm-btn-yes" style="background: #ef4444; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
          Sim, excluir
        </button>
      </div>
    </div>
  `,a.classList.add("active");const o=()=>{a.classList.remove("active")};(l=document.getElementById("confirm-btn-cancel"))==null||l.addEventListener("click",o),(r=document.getElementById("confirm-btn-yes"))==null||r.addEventListener("click",()=>{o(),t&&t()})}function x(e,t="success"){let a=document.getElementById("toast-notification-container");a||(a=document.createElement("div"),a.id="toast-notification-container",a.style.cssText=`
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `,document.body.appendChild(a));const o=document.createElement("div"),l=t==="error"?"rgba(255, 100, 100, 0.92)":t==="info"?"rgba(77, 163, 255, 0.92)":"rgba(53, 211, 154, 0.92)";o.style.cssText=`
    background: ${l};
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
  `,o.innerHTML=`<span>${t==="error"?"🚨":t==="info"?"ℹ️":"✅"}</span> <span>${g(e)}</span>`,a.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateY(10px)",o.style.transition="all 0.3s ease",setTimeout(()=>o.remove(),300)},3e3)}function rt(e){if(e)if(e.dataUrl){const t=window.open();t?t.document.write(`<title>${g(e.name)}</title><iframe src="${e.dataUrl}" frameborder="0" style="border:0; position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`):window.open(e.dataUrl,"_blank")}else{const t=`[VISUALIZAÇÃO DE ANEXO AUDIOVISUAL]

Nome do Arquivo: ${e.name}
Tamanho: ${e.size||"2.4 MB"}
Status: Arquivo verificado e seguro.`,a=new Blob([t],{type:"text/plain;charset=utf-8"}),o=URL.createObjectURL(a);window.open(o,"_blank")}}function ct(e){if(!e)return;let t=e.dataUrl,a=!1;if(!t){const l=`[DEMONSTRAÇÃO DE ARQUIVO AUDIOVISUAL]

Nome: ${e.name}
Data: ${new Date().toLocaleString()}
Workflow Audiovisual`,r=new Blob([l],{type:"application/octet-stream"});t=URL.createObjectURL(r),a=!0}const o=document.createElement("a");o.href=t,o.download=e.name||"anexo",document.body.appendChild(o),o.click(),document.body.removeChild(o),a&&setTimeout(()=>URL.revokeObjectURL(t),1e3)}function ut(e,t,{onEdit:a,onDelete:o,onStatusChange:l}){if(!t||t.length===0){e.innerHTML=`
      <div style="padding: 60px 24px; text-align: center; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 12px; opacity: 0.5;">🎬</div>
        <h3 style="color: var(--text-secondary); font-weight: 600; margin-bottom: 6px; font-size: 1rem;">Nenhum conteúdo encontrado</h3>
        <p style="font-size: 0.8125rem;">Ajuste os filtros ou clique em "+ Conteúdo" para adicionar.</p>
      </div>
    `;return}const r=t.map((n,c)=>{const d=n.code||(c+1).toString().padStart(2,"0"),s=G(n.category),p=lt(n.stage||"gravar"),h=dt(n.stage||"gravar");nt(n.status),ot(n.status);const v=n.assignee||"—",S=v!=="—"?v.charAt(0).toUpperCase():"?";let f="GRAVAR",u=n.dateShooting||n.dateEditingDeadline||n.datePosting||"",m=n.timeShooting||n.timeEditingDeadline||n.timePosting||"";n.stage==="editar"?(f="ENTREGA",u=n.dateEditingDeadline||n.dateShooting||"",m=n.timeEditingDeadline||n.timeShooting||""):n.stage==="concluido"&&(f="POSTAGEM",u=n.datePosting||n.dateEditingDeadline||"",m=n.timePosting||n.timeEditingDeadline||"");const E=`${f} ${P(u)}${m?", "+m:""}`;return`
      <tr data-id="${n.id}">
        <td>${d}</td>
        <td>
          <div class="content-cell">
            <div class="content-top-row">
              ${s}
              <span class="badge-stage ${p}">
                <span class="stage-dot"></span>
                ${h}
              </span>
            </div>
            <div class="content-title" data-action="edit" data-id="${n.id}">
              ${g(n.title)}
            </div>
            ${n.description?`<div class="content-subtitle">${g(n.description)}</div>`:""}
          </div>
        </td>
        <td>
          <div class="assignee-cell">
            <div class="assignee-avatar">${S}</div>
            <span class="assignee-name">${g(v)}</span>
          </div>
        </td>
        <td>
          <div class="table-data-cell">
            <span>${E}</span>
          </div>
        </td>
        <td>
          <div class="status-dropdown-wrapper">
            <span class="status-pill ${p}" data-action="edit" data-id="${n.id}" style="cursor: pointer;">
              ${h}
            </span>
          </div>
        </td>
      </tr>
    `}).join("");e.innerHTML=`
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
          ${r}
        </tbody>
      </table>
    </div>
  `,e.querySelectorAll('[data-action="edit"]').forEach(n=>{n.addEventListener("click",c=>{c.stopPropagation();const d=n.getAttribute("data-id");a&&a(d)})})}let D=new Date().getFullYear(),k=new Date().getMonth(),w="all",M=`${D}-${(k+1).toString().padStart(2,"0")}-${new Date().getDate().toString().padStart(2,"0")}`;const gt=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],pt=["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];function F(e,t,{onEdit:a,onSelectDay:o}){const l=new Date(D,k,1).getDay(),r=new Date(D,k+1,0).getDate(),n=new Date(D,k,0).getDate(),c=new Date,d=c.getFullYear()===D&&c.getMonth()===k,s=c.getDate(),p=`${gt[k]} De ${D}`;let h="";for(let f=l-1;f>=0;f--){const u=n-f;h+=`
      <div class="calendar-day-cell other-month">
        <div class="day-cell-top">
          <span class="day-number">${u}</span>
        </div>
        <div class="day-indicators-container"></div>
      </div>
    `}for(let f=1;f<=r;f++){const u=d&&f===s,m=`${D}-${(k+1).toString().padStart(2,"0")}-${f.toString().padStart(2,"0")}`,E=M===m,C=t.some(O=>O.dateShooting===m),A=t.some(O=>O.dateEditingDeadline===m),N=t.some(O=>O.datePosting===m);let L="";(w==="all"||w==="shooting")&&C&&(L+='<div class="day-indicator-bar bar-shooting" title="Gravação Agendada"></div>'),(w==="all"||w==="editing")&&A&&(L+='<div class="day-indicator-bar bar-editing" title="Prazo de Entrega"></div>'),(w==="all"||w==="posted")&&N&&(L+='<div class="day-indicator-bar bar-posted" title="Postagem Agendada"></div>'),h+=`
      <div class="calendar-day-cell ${u?"is-today":""} ${E?"is-selected":""}" data-date="${m}">
        <div class="day-cell-top">
          <span class="day-number">${f}</span>
        </div>
        <div class="day-indicators-container">
          ${L}
        </div>
      </div>
    `}const v=l+r,S=(v<=35?35:42)-v;for(let f=1;f<=S;f++)h+=`
      <div class="calendar-day-cell other-month">
        <div class="day-cell-top">
          <span class="day-number">${f}</span>
        </div>
        <div class="day-indicators-container"></div>
      </div>
    `;e.innerHTML=`
    <div class="calendar-wrapper">
      <div class="calendar-top-bar">
        <div class="calendar-nav-group">
          <button class="calendar-nav-btn" id="cal-prev-month">${T.chevronLeft}</button>
          <h3 class="calendar-current-month">${p}</h3>
          <button class="calendar-nav-btn" id="cal-next-month">${T.chevronRight}</button>
          <button class="calendar-today-btn" id="cal-go-today">Hoje</button>
        </div>

        <div class="calendar-layer-filters">
          <button class="layer-btn ${w==="all"?"active":""}" data-layer="all">TODOS</button>
          <button class="layer-btn ${w==="shooting"?"active":""}" data-layer="shooting">
            <span class="legend-dot" style="background:#3B82F6; box-shadow:0 0 6px #3B82F6;"></span> GRAVAÇÃO
          </button>
          <button class="layer-btn ${w==="editing"?"active":""}" data-layer="editing">
            <span class="legend-dot" style="background:#FF3344; box-shadow:0 0 6px #FF3344;"></span> ENTREGA
          </button>
          <button class="layer-btn ${w==="posted"?"active":""}" data-layer="posted">
            <span class="legend-dot" style="background:#10B981; box-shadow:0 0 6px #10B981;"></span> POSTAGEM
          </button>
        </div>
      </div>

      <div class="calendar-grid">
        ${pt.map(f=>`<div class="calendar-weekday-header">${f}</div>`).join("")}
        ${h}
      </div>
    </div>
  `,e.querySelector("#cal-prev-month").addEventListener("click",()=>{k--,k<0&&(k=11,D--),F(e,t,{onEdit:a,onSelectDay:o})}),e.querySelector("#cal-next-month").addEventListener("click",()=>{k++,k>11&&(k=0,D++),F(e,t,{onEdit:a,onSelectDay:o})}),e.querySelector("#cal-go-today").addEventListener("click",()=>{D=new Date().getFullYear(),k=new Date().getMonth(),M=`${D}-${(k+1).toString().padStart(2,"0")}-${new Date().getDate().toString().padStart(2,"0")}`,F(e,t,{onEdit:a,onSelectDay:o}),o&&o(M)}),e.querySelectorAll(".layer-btn").forEach(f=>{f.addEventListener("click",()=>{w=f.getAttribute("data-layer"),F(e,t,{onEdit:a,onSelectDay:o})})}),e.querySelectorAll(".calendar-day-cell[data-date]").forEach(f=>{f.addEventListener("click",()=>{const u=f.getAttribute("data-date");M=u,e.querySelectorAll(".calendar-day-cell").forEach(m=>m.classList.remove("is-selected")),f.classList.add("is-selected"),o&&o(u)})})}const mt=[{id:"gravar",title:"GRAVAR",color:"#06b6d4"},{id:"editar",title:"EDITAR",color:"#a855f7"},{id:"validacao",title:"VALIDAÇÃO",color:"#f59e0b"},{id:"concluido",title:"CONCLUÍDO",color:"#10b981"}];function vt(e,t,{onEdit:a,onStageChange:o,onAddWithStage:l}){const r=mt.map(c=>{const d=t.filter(p=>(p.stage||"gravar")===c.id),s=d.map(p=>{const h=G(p.category),v=nt(p.status),S=ot(p.status);let f=p.dateShooting?P(p.dateShooting):"—";return`
        <div class="kanban-card" draggable="true" data-id="${p.id}">
          <div class="kanban-card-top">
            ${h}
          </div>

          <div class="kanban-card-title" data-action="edit" data-id="${p.id}" style="cursor: pointer;">
            ${g(p.title)}
          </div>

          <div class="kanban-card-subdate">
            ${f}
          </div>

          <div class="kanban-card-bottom">
            <span class="status-pill ${v}" style="font-size: 0.65rem;">
              • ${S}
            </span>
          </div>
        </div>
      `}).join("");return`
      <div class="kanban-column" data-stage-id="${c.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title-group">
            <span class="kanban-col-indicator" style="background: ${c.color};"></span>
            <span class="kanban-col-title">${c.title}</span>
          </div>
          <span class="kanban-col-count">${d.length}</span>
        </div>

        <div class="kanban-cards-list" data-stage-id="${c.id}">
          ${s}
        </div>

        <button class="btn-kanban-col-add" data-action="add-stage" data-stage="${c.id}">
          + ADICIONAR
        </button>
      </div>
    `}).join("");e.innerHTML=`
    <div class="kanban-board">
      ${r}
    </div>
  `,e.querySelectorAll('[data-action="edit"]').forEach(c=>{c.addEventListener("click",d=>{d.stopPropagation();const s=c.getAttribute("data-id");a&&a(s)})}),e.querySelectorAll('[data-action="add-stage"]').forEach(c=>{c.addEventListener("click",()=>{const d=c.getAttribute("data-stage");l&&l(d)})});let n=null;e.querySelectorAll(".kanban-card").forEach(c=>{c.addEventListener("dragstart",d=>{n=c.getAttribute("data-id"),c.classList.add("dragging"),d.dataTransfer.setData("text/plain",n)}),c.addEventListener("dragend",()=>{c.classList.remove("dragging"),n=null})}),e.querySelectorAll(".kanban-cards-list").forEach(c=>{c.addEventListener("dragover",d=>{d.preventDefault(),c.style.background="rgba(139, 92, 246, 0.08)"}),c.addEventListener("dragleave",()=>{c.style.background="transparent"}),c.addEventListener("drop",d=>{d.preventDefault(),c.style.background="transparent";const s=c.getAttribute("data-stage-id");n&&s&&o&&o(n,s)})})}let i=null,$=!1,J=null,Y=null;function j({item:e=null,initialDate:t="",initialStage:a="gravar",onSave:o,onDelete:l}){J=o,Y=l,$=!e,e?i=JSON.parse(JSON.stringify(e)):i={id:null,title:"Novo Conteúdo",subtitle:"Reels • 9:16",category:y.getCategories()[0]||"INSTA",stage:a,status:"atencao",assignee:"Lucas",priority:"alta",dateShooting:t||"",timeShooting:"17:58",dateEditingDeadline:t||"",timeEditingDeadline:"17:58",datePosting:t||"",timePosting:"17:58",description:"Anotação teste de briefing...",links:[],attachments:[],checklist:[],comments:[]},B();const r=document.getElementById("content-modal-backdrop");r&&r.classList.add("active")}function U(){const e=document.getElementById("content-modal-backdrop");e&&e.classList.remove("active"),i=null}function B(){let e=document.getElementById("content-modal-backdrop");e||(e=document.createElement("div"),e.id="content-modal-backdrop",e.className="modal-backdrop",document.body.appendChild(e));const t=y.getCategories();e.innerHTML=`
    <div class="modal-container">
      <!-- Drawer Header -->
      <div class="modal-header">
        <div style="flex: 1;">
          <div class="modal-badges-row">
            ${G(i.category||"INSTA")}
            <span class="status-pill status-attention">• ${g((i.status||"ATENÇÃO").toUpperCase())}</span>
          </div>

          ${$?`
            <input type="text" id="modal-field-title" class="form-control" value="${g(i.title)}" placeholder="Título do Conteúdo" style="font-size: 1.1rem; font-weight: 800; margin-bottom: 6px;" />
            <input type="text" id="modal-field-subtitle" class="form-control" value="${g(i.subtitle||"")}" placeholder="Subtítulo (Ex: Reels • 9:16)" style="font-size: 0.8rem;" />
          `:`
            <h2 class="modal-title-text">${g(i.title)}</h2>
            <div class="modal-subtitle-text">${g(i.subtitle||"")}</div>
          `}
        </div>

        <div class="modal-actions-top">
          <button class="modal-icon-btn" id="modal-btn-toggle-edit" title="${$?"Visualizar":"Editar Conteúdo"}">
            ${T.edit}
          </button>
          <button class="modal-icon-btn modal-delete-trigger" id="modal-btn-delete-item" title="Excluir Conteúdo">
            ${T.trash}
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
            <button class="stage-select-pill ${i.stage==="gravar"?"active":""}" data-stage="gravar">
              🎥 GRAVAR
            </button>
            <button class="stage-select-pill ${i.stage==="editar"?"active":""}" data-stage="editar">
              ✂️ EDITAR
            </button>
            <button class="stage-select-pill ${i.stage==="validacao"?"active":""}" data-stage="validacao">
              👁️ VALIDAÇÃO
            </button>
            <button class="stage-select-pill ${i.stage==="concluido"?"active":""}" data-stage="concluido">
              🚀 CONCLUÍDO
            </button>
          </div>
        </div>

        <!-- Details Form / Fields Grid -->
        <div class="drawer-fields-grid">
          <div class="form-group">
            <label class="drawer-label">CATEGORIA</label>
            ${$?`
              <select id="modal-field-category" class="form-control">
                ${t.map(a=>`
                  <option value="${g(a)}" ${i.category===a?"selected":""}>${g(a)}</option>
                `).join("")}
              </select>
            `:`
              <div class="readonly-field-val">${g(i.category||"INSTA")}</div>
            `}
          </div>

          <div class="form-group">
            <label class="drawer-label">RESPONSÁVEL</label>
            ${$?`
              <input type="text" id="modal-field-assignee" class="form-control" value="${g(i.assignee||"Lucas")}" />
            `:`
              <div class="readonly-field-val">${g(i.assignee||"Lucas")}</div>
            `}
          </div>

          <!-- Cronograma de Datas -->
          <div class="form-group full-width">
            <label class="drawer-label">CRONOGRAMA DE DATAS</label>
            <div class="schedule-dates-row">
              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#3B82F6;">🎥 GRAVAÇÃO</span>
                ${$?`
                  <input type="date" id="modal-field-dateShooting" class="form-control" value="${i.dateShooting||""}" />
                  <input type="time" id="modal-field-timeShooting" class="form-control" value="${i.timeShooting||"17:58"}" style="margin-top:4px;" />
                `:`
                  <div class="schedule-val-text">${P(i.dateShooting)} ${i.timeShooting?", "+i.timeShooting:""}</div>
                `}
              </div>

              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#FF3344;">✂️ ENTREGA DA EDIÇÃO</span>
                ${$?`
                  <input type="date" id="modal-field-dateEditingDeadline" class="form-control" value="${i.dateEditingDeadline||""}" />
                  <input type="time" id="modal-field-timeEditingDeadline" class="form-control" value="${i.timeEditingDeadline||"17:58"}" style="margin-top:4px;" />
                `:`
                  <div class="schedule-val-text">${P(i.dateEditingDeadline)} ${i.timeEditingDeadline?", "+i.timeEditingDeadline:""}</div>
                `}
              </div>

              <div class="schedule-date-box">
                <span class="schedule-type-title" style="color:#10B981;">🚀 POSTAGEM</span>
                ${$?`
                  <input type="date" id="modal-field-datePosting" class="form-control" value="${i.datePosting||""}" />
                  <input type="time" id="modal-field-timePosting" class="form-control" value="${i.timePosting||"17:58"}" style="margin-top:4px;" />
                `:`
                  <div class="schedule-val-text">${P(i.datePosting)} ${i.timePosting?", "+i.timePosting:""}</div>
                `}
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label class="drawer-label">DESCRIÇÃO E BRIEFING</label>
            ${$?`
              <textarea id="modal-field-description" class="form-control" rows="3">${g(i.description||"")}</textarea>
            `:`
              <div class="readonly-field-val textarea-readonly">${g(i.description||"Nenhum detalhe adicional.")}</div>
            `}
          </div>
        </div>

        <!-- Links e Referências -->
        <div>
          <h4 class="drawer-section-title">LINKS DE REFERÊNCIA</h4>
          <div class="drawer-links-list">
            ${i.links.map(a=>`
              <div class="drawer-link-item">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="color:var(--accent); font-size:0.6875rem; font-weight:600;">↪ ${g(a.title||"Referência")}</span>
                  <a href="${g(a.url)}" target="_blank" rel="noopener" class="drawer-link-url">${g(a.url)}</a>
                </div>
                <button class="action-btn-mini delete-btn" data-action="remove-link" data-link-id="${a.id}">
                  ${T.trash}
                </button>
              </div>
            `).join("")}
          </div>

          <div class="drawer-add-link-row">
            <input type="text" id="new-link-title" class="form-control" placeholder="Rótulo (ex: Drive)" style="flex: 1; min-width: 0;" />
            <input type="url" id="new-link-url" class="form-control" placeholder="https://" style="flex: 1.2; min-width: 0;" />
            <button class="btn-primary" id="btn-add-link">+ Link</button>
          </div>
        </div>

        <!-- Anexos com Opções de Abrir e Baixar -->
        <div>
          <h4 class="drawer-section-title">ANEXOS (${i.attachments.length})</h4>
          <div class="drawer-links-list">
            ${i.attachments.length>0?i.attachments.map(a=>`
              <div class="drawer-link-item" style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:8px; cursor:pointer; flex:1; min-width:0;" data-action="open-attachment" data-att-id="${a.id}" title="Clique para abrir ${g(a.name)}">
                  <span style="color:var(--accent); font-size:0.9rem;">${T.file}</span>
                  <span style="font-size:0.8rem; font-weight:600; color:var(--text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
                    ${g(a.name)}
                  </span>
                  <span style="font-size:0.6875rem; color:var(--text-muted); font-family:var(--font-mono);">(${g(a.size||"1.0 MB")})</span>
                </div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <button class="action-btn-mini" data-action="download-attachment" data-att-id="${a.id}" title="Baixar Arquivo" style="color:var(--accent);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                  <button class="action-btn-mini delete-btn" data-action="remove-attachment" data-att-id="${a.id}" title="Remover Anexo">
                    ${T.trash}
                  </button>
                </div>
              </div>
            `).join(""):`
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
            ${i.comments&&i.comments.length>0?i.comments.map(a=>{const o=a.author==="Você"||a.author==="Lucas",l=a.author?a.author.charAt(0).toUpperCase():"U";return`
                <div class="chat-msg-row ${o?"chat-msg-me":"chat-msg-other"}">
                  <div class="chat-avatar">${l}</div>
                  <div class="chat-bubble">
                    <div class="chat-bubble-header">
                      <span class="chat-author-name">${g(a.author)}</span>
                      <span class="chat-time-stamp">${g(a.time||"")}</span>
                    </div>
                    <div class="chat-bubble-body">${g(a.text)}</div>
                  </div>
                </div>
              `}).join(""):`
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
  `,ft()}function ft(){var l,r,n,c,d,s,p,h,v,S,f;(l=document.getElementById("modal-btn-close"))==null||l.addEventListener("click",U),(r=document.getElementById("modal-btn-cancel"))==null||r.addEventListener("click",U),(n=document.getElementById("modal-btn-toggle-edit"))==null||n.addEventListener("click",()=>{$=!$,B()}),document.querySelectorAll(".stage-select-pill").forEach(u=>{u.addEventListener("click",()=>{i.stage=u.getAttribute("data-stage"),B()})});const e=()=>{const u=document.getElementById("new-link-title"),m=document.getElementById("new-link-url");m&&m.value.trim()&&(i.links.push({id:_(),title:(u==null?void 0:u.value.trim())||"Referência",url:m.value.trim(),type:"reference"}),B())};(c=document.getElementById("btn-add-link"))==null||c.addEventListener("click",e);const t=u=>{u.key==="Enter"&&(u.preventDefault(),e())};(d=document.getElementById("new-link-title"))==null||d.addEventListener("keydown",t),(s=document.getElementById("new-link-url"))==null||s.addEventListener("keydown",t),document.querySelectorAll('[data-action="remove-link"]').forEach(u=>{u.addEventListener("click",m=>{m.stopPropagation();const E=u.getAttribute("data-link-id");i.links=i.links.filter(C=>C.id!==E),B()})}),document.querySelectorAll('[data-action="open-attachment"]').forEach(u=>{u.addEventListener("click",()=>{const m=u.getAttribute("data-att-id"),E=i.attachments.find(C=>C.id===m);E&&(rt(E),x(`Abrindo "${E.name}"...`,"info"))})}),document.querySelectorAll('[data-action="download-attachment"]').forEach(u=>{u.addEventListener("click",m=>{m.stopPropagation();const E=u.getAttribute("data-att-id"),C=i.attachments.find(A=>A.id===E);C&&(ct(C),x(`Download de "${C.name}" iniciado!`))})});const a=document.getElementById("modal-file-input");(p=document.getElementById("btn-trigger-upload"))==null||p.addEventListener("click",()=>a==null?void 0:a.click()),a==null||a.addEventListener("change",u=>{const m=u.target.files;if(m&&m.length>0){let E=0;for(let C=0;C<m.length;C++){const A=m[C],N=new FileReader;N.onload=L=>{i.attachments.push({id:_(),name:A.name,size:`${(A.size/(1024*1024)).toFixed(1)} MB`,type:A.name.split(".").pop(),dataUrl:L.target.result}),E++,E===m.length&&(B(),x(`${m.length} arquivo(s) anexado(s)!`))},N.readAsDataURL(A)}}}),document.querySelectorAll('[data-action="remove-attachment"]').forEach(u=>{u.addEventListener("click",m=>{m.stopPropagation();const E=u.getAttribute("data-att-id");i.attachments=i.attachments.filter(C=>C.id!==E),B()})});const o=()=>{const u=document.getElementById("new-comment-input");if(u&&u.value.trim()){const m=new Date,E=`${m.getHours().toString().padStart(2,"0")}:${m.getMinutes().toString().padStart(2,"0")}`;i.comments.push({id:_(),author:"Você",text:u.value.trim(),time:E}),B()}};(h=document.getElementById("btn-send-comment"))==null||h.addEventListener("click",o),(v=document.getElementById("new-comment-input"))==null||v.addEventListener("keydown",u=>{u.key==="Enter"&&(u.preventDefault(),o())}),(S=document.getElementById("modal-btn-delete"))==null||S.addEventListener("click",()=>{i.id&&K({title:`Deseja realmente excluir "${i.title}"?`,onConfirm:()=>{Y&&i.id&&Y(i.id),U()}})}),(f=document.getElementById("modal-btn-save"))==null||f.addEventListener("click",()=>{var u,m,E,C,A,N,L,O,Q,X;$&&(i.title=((u=document.getElementById("modal-field-title"))==null?void 0:u.value.trim())||i.title,i.subtitle=((m=document.getElementById("modal-field-subtitle"))==null?void 0:m.value.trim())||i.subtitle,i.category=((E=document.getElementById("modal-field-category"))==null?void 0:E.value)||i.category,i.description=((C=document.getElementById("modal-field-desc"))==null?void 0:C.value)||i.description,i.dateShooting=((A=document.getElementById("modal-field-date-shooting"))==null?void 0:A.value)||i.dateShooting,i.timeShooting=((N=document.getElementById("modal-field-time-shooting"))==null?void 0:N.value)||i.timeShooting,i.dateEditingDeadline=((L=document.getElementById("modal-field-date-editing"))==null?void 0:L.value)||i.dateEditingDeadline,i.timeEditingDeadline=((O=document.getElementById("modal-field-time-editing"))==null?void 0:O.value)||i.timeEditingDeadline,i.datePosting=((Q=document.getElementById("modal-field-date-posting"))==null?void 0:Q.value)||i.datePosting,i.timePosting=((X=document.getElementById("modal-field-time-posting"))==null?void 0:X.value)||i.timePosting),J&&J(i),U()})}const b={currentView:"table",activeCategory:"all",searchQuery:"",activeStatusFilter:null,selectedCalendarDay:null};function yt(){ht(),xt(),bt(),y.subscribe(()=>{at(),V(),R(),I()}),at(),V(),R(),I()}function ht(){const e=localStorage.getItem("app-theme")||"dark";et(e);const t=document.getElementById("btn-theme-toggle");t==null||t.addEventListener("click",()=>{const o=(document.documentElement.getAttribute("data-theme")||"dark")==="dark"?"light":"dark";et(o),localStorage.setItem("app-theme",o)})}function et(e){document.documentElement.setAttribute("data-theme",e);const t=document.querySelector(".icon-theme-dark"),a=document.querySelector(".icon-theme-light");t&&a&&(e==="light"?(t.style.display="none",a.style.display="block"):(t.style.display="block",a.style.display="none"))}function bt(){const e=document.getElementById("live-digital-clock"),t=document.getElementById("live-top-date"),a=()=>{const o=new Date,l=o.getHours().toString().padStart(2,"0"),r=o.getMinutes().toString().padStart(2,"0"),n=o.getSeconds().toString().padStart(2,"0");if(e&&(e.textContent=`${l}:${r}:${n}`),t){const c=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];t.textContent=`${o.getDate()} DE ${c[o.getMonth()].toUpperCase()} DE ${o.getFullYear()}`}};a(),setInterval(a,1e3)}function at(){const e=y.getAll(),t=e.filter(s=>s.stage==="concluido"||s.status==="postado").length,a=e.filter(s=>s.status==="atencao").length,o=e.filter(s=>s.status==="atrasado").length,l=e.filter(s=>s.status==="pendente"||s.stage==="gravar"||s.stage==="editar").length,r=document.getElementById("metric-val-concluidos"),n=document.getElementById("metric-val-attention"),c=document.getElementById("metric-val-delayed"),d=document.getElementById("metric-val-pending");r&&(r.textContent=t),n&&(n.textContent=a),c&&(c.textContent=o),d&&(d.textContent=l)}function V(){const e=document.getElementById("right-panel-mount");if(!e)return;const t=y.getAll();if(b.currentView==="calendar"){const s=b.selectedCalendarDay||M,p=t.filter(v=>v.dateShooting===s||v.dateEditingDeadline===s||v.datePosting===s),h=p.map(v=>{let S=[];return v.dateShooting===s&&S.push(`<span style="font-size:0.65rem; font-weight:700; color:#3B82F6; background:rgba(59,130,246,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(59,130,246,0.3);">🎥 GRAVAÇÃO ${v.timeShooting||""}</span>`),v.dateEditingDeadline===s&&S.push(`<span style="font-size:0.65rem; font-weight:700; color:#FF3344; background:rgba(255,51,68,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(255,51,68,0.3);">✂️ ENTREGA ${v.timeEditingDeadline||""}</span>`),v.datePosting===s&&S.push(`<span style="font-size:0.65rem; font-weight:700; color:#10B981; background:rgba(16,185,129,0.15); padding:2px 6px; border-radius:4px; border:1px solid rgba(16,185,129,0.3);">🚀 POSTAGEM ${v.timePosting||""}</span>`),`
        <div class="day-item-mini-card" data-action="edit" data-id="${v.id}" style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            ${G(v.category)}
            <span style="font-size:0.7rem; color:var(--text-muted);">${g(v.assignee||"Lucas")}</span>
          </div>
          <div style="font-weight:600; font-size:0.8125rem; color:var(--text-primary);">${g(v.title)}</div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:2px;">
            ${S.join("")}
          </div>
        </div>
      `}).join("");e.innerHTML=`
      <div class="summary-card">
        <h4 class="summary-card-title">CONTEÚDOS DO DIA (${P(s)})</h4>
        ${p.length>0?`
          <div class="calendar-selected-day-panel">
            ${h}
          </div>
        `:`
          <div style="padding: 24px 10px; text-align: center; color: var(--text-muted); font-size: 0.82rem;">
            Nenhum conteúdo agendado para este dia.
          </div>
        `}
      </div>
    `,e.querySelectorAll('[data-action="edit"]').forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-id"),f=y.getById(S);f&&j({item:f,onSave:u=>{y.update(S,u),x("Conteúdo salvo com sucesso!")},onDelete:u=>{y.delete(u),x("Conteúdo excluído!","info")}})})});return}const a=t.filter(s=>(s.stage||"gravar")==="gravar").length,o=t.filter(s=>s.stage==="editar").length,l=t.filter(s=>s.stage==="validacao").length,r=t.filter(s=>s.stage==="concluido"||s.status==="postado").length,n=t.length,c=n>0?Math.round(r/n*100):0,d=t.filter(s=>s.status==="atrasado");e.innerHTML=`
    <!-- ETAPAS Card -->
    <div class="summary-card">
      <h4 class="summary-card-title">ETAPAS</h4>
      <div class="etapas-list">
        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#06b6d4;"></span>
            <span style="color:#67e8f9;">GRAVAR</span>
          </div>
          <span class="etapa-item-count">${a}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#a855f7;"></span>
            <span style="color:#d8b4fe;">EDITAR</span>
          </div>
          <span class="etapa-item-count">${o}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#f59e0b;"></span>
            <span style="color:#fde047;">VALIDAÇÃO</span>
          </div>
          <span class="etapa-item-count">${l}</span>
        </div>

        <div class="etapa-item-row">
          <div class="etapa-item-label">
            <span class="etapa-item-dot" style="background:#10b981;"></span>
            <span style="color:#86efac;">CONCLUÍDO</span>
          </div>
          <span class="etapa-item-count">${r}</span>
        </div>
      </div>
    </div>

    <!-- RESUMO Card -->
    <div class="summary-card">
      <h4 class="summary-card-title">RESUMO</h4>
      <div class="resumo-stats">
        <div class="resumo-row">
          <span class="resumo-label">Total</span>
          <span class="resumo-val">${n}</span>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${c}%;"></div>
        </div>
        <span class="progress-label-text">${c}% CONCLUÍDO</span>
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
        ${d.length>0?`
          <div style="color:#ef4444; font-weight:800;">${d.length} conteúdos atrasados!</div>
        `:`
          Nada atrasado. 🎯
        `}
      </div>
    </div>
  `}function Et(){let e=y.getAll();if(b.currentView==="completed"?e=e.filter(t=>t.stage==="concluido"||t.status==="postado"):b.currentView==="kanban"||(e=e.filter(t=>t.stage!=="concluido"&&t.status!=="postado")),b.activeCategory!=="all"&&(e=e.filter(t=>(t.category||"GERAL").toUpperCase()===b.activeCategory)),b.activeStatusFilter&&(b.activeStatusFilter==="pending"?e=e.filter(t=>t.stage==="gravar"||t.stage==="editar"):b.activeStatusFilter==="atencao"?e=e.filter(t=>t.stage==="validacao"):e=e.filter(t=>t.status===b.activeStatusFilter)),b.searchQuery.trim()){const t=b.searchQuery.toLowerCase();e=e.filter(a=>a.title.toLowerCase().includes(t)||a.assignee&&a.assignee.toLowerCase().includes(t)||a.description&&a.description.toLowerCase().includes(t))}return e}function I(){const e=document.getElementById("view-content-mount");if(!e)return;const t=document.querySelector(".board-main-title"),a=document.querySelector(".board-main-subtitle");b.currentView==="completed"?(t&&(t.textContent="Conteúdos Concluídos"),a&&(a.textContent="Histórico de entregas e postagens finalizadas")):(t&&(t.textContent="Fluxo de trabalho"),a&&(a.textContent="Ordenado pelo prazo mais próximo"));const o=Et(),l={onEdit:r=>{const n=y.getById(r);n&&j({item:n,onSave:c=>{y.update(r,c),x("Conteúdo salvo com sucesso!")},onDelete:c=>{y.delete(c),x("Conteúdo excluído!","info")}})},onAddWithStage:r=>{j({initialStage:r,onSave:n=>{y.create(n),x(`Conteúdo adicionado em ${r.toUpperCase()}!`)}})},onStageChange:(r,n)=>{y.updateStage(r,n),x(n==="concluido"?"Conteúdo concluído e movido para a aba Concluídos! 🚀":`Conteúdo movido para ${n.toUpperCase()}!`,"info"),I()},onStatusChange:(r,n)=>{y.updateStatus(r,n),x("Status atualizado!","info"),I()},onDelete:r=>{const n=y.getById(r);K({title:`Deseja realmente excluir "${(n==null?void 0:n.title)||"este conteúdo"}"?`,onConfirm:()=>{y.delete(r),x("Conteúdo excluído com sucesso!","info")}})},onSelectDay:r=>{b.selectedCalendarDay=r,V()}};switch(b.currentView){case"calendar":F(e,o,l);break;case"kanban":vt(e,o,l);break;case"completed":case"table":default:ut(e,o,l);break}}function xt(){var o,l,r,n,c;document.querySelectorAll(".dock-btn[data-view]").forEach(d=>{d.addEventListener("click",()=>{document.querySelectorAll(".dock-btn[data-view]").forEach(s=>s.classList.remove("active")),d.classList.add("active"),b.currentView=d.getAttribute("data-view"),V(),I()})});const e=document.getElementById("global-search-input");e==null||e.addEventListener("input",d=>{b.searchQuery=d.target.value,I()}),(o=document.getElementById("btn-header-add-content"))==null||o.addEventListener("click",()=>{j({onSave:d=>{y.create(d),x("Novo conteúdo criado com sucesso!")}})}),(l=document.getElementById("btn-settings-gear"))==null||l.addEventListener("click",it);const t=document.getElementById("card-metric-concluidos");t==null||t.addEventListener("click",()=>{var d;document.querySelectorAll(".dock-btn[data-view]").forEach(s=>s.classList.remove("active")),(d=document.querySelector('.dock-btn[data-view="completed"]'))==null||d.classList.add("active"),b.currentView="completed",V(),I()});const a=[{id:"card-metric-attention",status:"atencao"},{id:"card-metric-delayed",status:"atrasado"},{id:"card-metric-pending",status:"pending"}];a.forEach(({id:d,status:s})=>{const p=document.getElementById(d);p==null||p.addEventListener("click",()=>{b.activeStatusFilter===s?(b.activeStatusFilter=null,p.classList.remove("active")):(a.forEach(h=>{var v;return(v=document.getElementById(h.id))==null?void 0:v.classList.remove("active")}),b.activeStatusFilter=s,p.classList.add("active")),I()})}),(r=document.getElementById("btn-export-data"))==null||r.addEventListener("click",()=>{const d=y.exportDataJson(),s=new Blob([d],{type:"application/json"}),p=URL.createObjectURL(s),h=document.createElement("a");h.href=p,h.download=`backup_workflow_audiovisual_${new Date().toISOString().slice(0,10)}.json`,h.click(),URL.revokeObjectURL(p),x("Backup JSON baixado com sucesso!")}),(n=document.getElementById("btn-import-trigger"))==null||n.addEventListener("click",()=>{const d=document.createElement("input");d.type="file",d.accept=".json",d.onchange=s=>{const p=s.target.files[0];if(p){const h=new FileReader;h.onload=v=>{y.importDataJson(v.target.result)?(x("Dados importados com sucesso!"),R()):x("Erro ao importar arquivo JSON.","error")},h.readAsText(p)}},d.click()}),(c=document.getElementById("btn-reset-data"))==null||c.addEventListener("click",()=>{K({title:"Deseja restaurar os dados de exemplo padrão?",onConfirm:()=>{y.resetToDefault(),R(),x("Dados restaurados ao padrão!","info")}})}),window.addEventListener("keydown",d=>{var s;d.key==="Escape"&&(U(),(s=document.getElementById("category-manager-backdrop"))==null||s.classList.remove("active"))})}function R(){var o;const e=document.getElementById("category-pills-container");if(!e)return;const t=y.getCategories(),a=`
    <button class="filter-pill ${b.activeCategory==="all"?"active":""}" data-category="all">TODAS</button>
    ${t.map(l=>{const r=y.getCategoryColor(l),n=b.activeCategory===l,c=r?n?`style="background: ${r}33; color: ${r}; border-color: ${r}; box-shadow: 0 0 16px ${r}66;"`:`style="border-color: ${r}44; color: ${r};"`:"";return`
        <button class="filter-pill ${n?"active":""}" data-category="${l}" ${c}>
          ${g(l)}
        </button>
      `}).join("")}
    <button class="btn-add-category-pill" id="btn-add-category-trigger" title="Adicionar Nova Categoria">+ Categoria</button>
  `;e.innerHTML=a,e.querySelectorAll(".filter-pill[data-category]").forEach(l=>{l.addEventListener("click",()=>{b.activeCategory=l.getAttribute("data-category"),R(),I()})}),(o=document.getElementById("btn-add-category-trigger"))==null||o.addEventListener("click",it)}function it(){let e=document.getElementById("category-manager-backdrop");e||(e=document.createElement("div"),e.id="category-manager-backdrop",e.className="modal-backdrop centered-backdrop",document.body.appendChild(e));const t=()=>{var r,n,c;const a=y.getCategories();e.innerHTML=`
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
          ${a.map(d=>{const s=y.getCategoryColor(d)||"#2563EB";return`
              <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:8px 14px; border-radius:var(--radius-md);">
                <div style="display:flex; align-items:center; gap:10px;">
                  <input type="color" class="cat-color-input" data-name="${g(d)}" value="${s}" style="width:28px; height:28px; border:none; background:transparent; cursor:pointer; padding:0;" title="Mudar cor de ${g(d)}" />
                  <span class="badge-category" data-category="${g(d)}" style="background:${s}22; color:${s}; border-color:${s}66;">${g(d)}</span>
                </div>
                <button class="action-btn-mini delete-btn" data-action="remove-cat" data-name="${g(d)}" title="Remover Categoria">
                  ${T.trash}
                </button>
              </div>
            `}).join("")}
        </div>

        <div style="margin-top:12px; display:flex; justify-content:flex-end;">
          <button class="btn-primary" id="cat-modal-btn-done">Concluído</button>
        </div>
      </div>
    `,e.classList.add("active");const o=document.getElementById("cat-modal-input");o&&o.focus();const l=()=>{const d=document.getElementById("cat-modal-input"),s=document.getElementById("cat-modal-new-color");if(d&&d.value.trim()){const p=s?s.value:null;y.addCategory(d.value.trim(),p)?(x(`Categoria "${d.value.trim().toUpperCase()}" criada!`),R(),t()):x("Esta categoria já existe.","info")}};(r=document.getElementById("cat-modal-close"))==null||r.addEventListener("click",()=>e.classList.remove("active")),(n=document.getElementById("cat-modal-btn-done"))==null||n.addEventListener("click",()=>e.classList.remove("active")),(c=document.getElementById("cat-modal-btn-add"))==null||c.addEventListener("click",l),o==null||o.addEventListener("keydown",d=>{d.key==="Enter"&&l()}),e.querySelectorAll(".cat-color-input").forEach(d=>{d.addEventListener("change",s=>{const p=d.getAttribute("data-name"),h=s.target.value;y.setCategoryColor(p,h),x(`Cor da categoria "${p}" atualizada!`),R(),t()})}),e.querySelectorAll('[data-action="remove-cat"]').forEach(d=>{d.addEventListener("click",()=>{const s=d.getAttribute("data-name");y.removeCategory(s),x(`Categoria "${s}" removida!`,"info"),R(),t()})})};t()}window.addEventListener("DOMContentLoaded",yt);
