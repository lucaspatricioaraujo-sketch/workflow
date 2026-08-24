/* ==========================================================================
   CALENDAR VIEW COMPONENT - FIXED GRID & DAY SELECTION
   ========================================================================== */

import { ICONS, escapeHtml, formatDateBr } from '../utils.js';

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let activeLayer = 'all'; // 'all', 'shooting', 'editing', 'posted'
export let selectedCalendarDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;

const MONTH_NAMES_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAY_NAMES_PT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function renderCalendarView(container, items, { onEdit, onSelectDay }) {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const today = new Date();
  const isCurrentMonthView = today.getFullYear() === currentYear && today.getMonth() === currentMonth;
  const todayDateNumber = today.getDate();

  const monthTitle = `${MONTH_NAMES_PT[currentMonth]} De ${currentYear}`;

  let daysHtml = '';

  // 1. Prev month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    daysHtml += `
      <div class="calendar-day-cell other-month">
        <div class="day-cell-top">
          <span class="day-number">${dayNum}</span>
        </div>
        <div class="day-indicators-container"></div>
      </div>
    `;
  }

  // 2. Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonthView && d === todayDateNumber;
    const dateFormatted = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    const isSelected = selectedCalendarDate === dateFormatted;

    // Check events on this day
    const hasShooting = items.some(i => i.dateShooting === dateFormatted);
    const hasEditing = items.some(i => i.dateEditingDeadline === dateFormatted);
    const hasPosting = items.some(i => i.datePosting === dateFormatted);

    let barsHtml = '';
    if ((activeLayer === 'all' || activeLayer === 'shooting') && hasShooting) {
      barsHtml += `<div class="day-indicator-bar bar-shooting" title="Gravação Agendada"></div>`;
    }
    if ((activeLayer === 'all' || activeLayer === 'editing') && hasEditing) {
      barsHtml += `<div class="day-indicator-bar bar-editing" title="Prazo de Entrega"></div>`;
    }
    if ((activeLayer === 'all' || activeLayer === 'posted') && hasPosting) {
      barsHtml += `<div class="day-indicator-bar bar-posted" title="Postagem Agendada"></div>`;
    }

    daysHtml += `
      <div class="calendar-day-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}" data-date="${dateFormatted}">
        <div class="day-cell-top">
          <span class="day-number">${d}</span>
        </div>
        <div class="day-indicators-container">
          ${barsHtml}
        </div>
      </div>
    `;
  }

  // 3. Next month leading days to complete grid
  const totalRendered = firstDayOfMonth + daysInMonth;
  const remainingCells = (totalRendered <= 35 ? 35 : 42) - totalRendered;
  for (let nextD = 1; nextD <= remainingCells; nextD++) {
    daysHtml += `
      <div class="calendar-day-cell other-month">
        <div class="day-cell-top">
          <span class="day-number">${nextD}</span>
        </div>
        <div class="day-indicators-container"></div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="calendar-wrapper">
      <div class="calendar-top-bar">
        <div class="calendar-nav-group">
          <button class="calendar-nav-btn" id="cal-prev-month">${ICONS.chevronLeft}</button>
          <h3 class="calendar-current-month">${monthTitle}</h3>
          <button class="calendar-nav-btn" id="cal-next-month">${ICONS.chevronRight}</button>
          <button class="calendar-today-btn" id="cal-go-today">Hoje</button>
        </div>

        <div class="calendar-layer-filters">
          <button class="layer-btn ${activeLayer === 'all' ? 'active' : ''}" data-layer="all">TODOS</button>
          <button class="layer-btn ${activeLayer === 'shooting' ? 'active' : ''}" data-layer="shooting">
            <span class="legend-dot" style="background:#3B82F6; box-shadow:0 0 6px #3B82F6;"></span> GRAVAÇÃO
          </button>
          <button class="layer-btn ${activeLayer === 'editing' ? 'active' : ''}" data-layer="editing">
            <span class="legend-dot" style="background:#FF3344; box-shadow:0 0 6px #FF3344;"></span> ENTREGA
          </button>
          <button class="layer-btn ${activeLayer === 'posted' ? 'active' : ''}" data-layer="posted">
            <span class="legend-dot" style="background:#10B981; box-shadow:0 0 6px #10B981;"></span> POSTAGEM
          </button>
        </div>
      </div>

      <div class="calendar-grid">
        ${WEEKDAY_NAMES_PT.map(name => `<div class="calendar-weekday-header">${name}</div>`).join('')}
        ${daysHtml}
      </div>
    </div>
  `;

  // Attach controls
  container.querySelector('#cal-prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendarView(container, items, { onEdit, onSelectDay });
  });

  container.querySelector('#cal-next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendarView(container, items, { onEdit, onSelectDay });
  });

  container.querySelector('#cal-go-today').addEventListener('click', () => {
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    selectedCalendarDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
    renderCalendarView(container, items, { onEdit, onSelectDay });
    if (onSelectDay) onSelectDay(selectedCalendarDate);
  });

  container.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLayer = btn.getAttribute('data-layer');
      renderCalendarView(container, items, { onEdit, onSelectDay });
    });
  });

  // Day selection click
  container.querySelectorAll('.calendar-day-cell[data-date]').forEach(cell => {
    cell.addEventListener('click', () => {
      const date = cell.getAttribute('data-date');
      selectedCalendarDate = date;
      container.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('is-selected'));
      cell.classList.add('is-selected');
      if (onSelectDay) onSelectDay(date);
    });
  });
}
