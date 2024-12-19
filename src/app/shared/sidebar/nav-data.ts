export const navbarData = [
    {
      routeLink: 'dashboard',
      icon: 'bi bi-calendar-range',
      label: 'Dashboard',
      roles: ['administrador_pasaportes', 'atencion_pasaporte'],  // Añadir roles
    },
    {
      routeLink: 'citas',
      icon: 'bi bi-calendar-event',
      label: 'Citas',
      roles: ['asignador'],
    },
    {
      routeLink: 'citas-modulo',
      icon: 'bi bi-calendar-event',
      label: 'Citas por modulo',
      roles: ['atencion_pasaporte'],
    },
    {
      routeLink: 'citas-prioritarias',
      icon: 'bi bi-1-square-fill',
      label: 'Citas Prioritarias',
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
      icon: 'bi bi-people',
      label: 'Reportes',
      roles: ['administrador_pasaportes', 'administrador_ganadero'],
    },
  ];