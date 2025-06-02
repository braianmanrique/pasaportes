export const navbarData = [
  {
    routeLink: 'dashboard',
    icon: 'bi bi-house-door-fill',
    label: 'Inicio',
    roles: [
      'administrador_pasaportes',
      'atencion_pasaporte',
      'asignador',
      'administrador_juntas',
      'administrador_discapacidad',
      'atencion_ganadero',
      'administrador_ganadero',
      'administrador_sistema',
      'visor',
    ], 
  },
  {
    routeLink: 'citas',
    icon: 'bi bi-calendar-event',
    label: 'Citas',
    roles: ['asignador', 'administrador_pasaportes'],
  },
  {
    routeLink: 'citas-carnet',
    icon: 'bi bi-calendar-event',
    label: 'Citas',
    roles: ['atencion_ganadero'],
  },
  {
    routeLink: 'citas-modulo',
    icon: 'bi bi-window-stack',
    label: 'Atender Citas',
    roles: ['atencion_pasaporte'],
  },
  {
    routeLink: 'citas-prioritarias',
    icon: 'bi bi-calendar-check',
    label: 'Gestionar Citas',
    roles: ['administrador_pasaportes'],
  },
  {
    routeLink: 'formalizadores',
    icon: 'bi bi-people',
    label: 'Formalizadores',
    roles: ['administrador_pasaportes'],
  },
  {
    routeLink: 'reportes',
    icon: 'bi bi-bar-chart-line',
    label: 'Reportes',
    roles: [
      'administrador_pasaportes',
      'administrador_ganadero',
      'administrador_juntas',
      'administrador_discapacidad',
      'administrador_sistema',
      'atencion_pasaporte',
      'asignador'
    ],
  },
  {
    routeLink: 'visor',
    icon: 'bi bi-people',
    label: 'Visor',
    roles: ['visor'],
  },
];
