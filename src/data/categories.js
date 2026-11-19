export const CATEGORIES = [
  {
    id: 'alimentacion',
    name: 'Alimentación',
    icon: '🛒',
    color: '#2563eb',
    bgColor: '#eff6ff',
  },
  {
    id: 'transporte',
    name: 'Transporte',
    icon: '⛽',
    color: '#0284c7',
    bgColor: '#e0f2fe',
  },
  {
    id: 'servicios',
    name: 'Servicios',
    icon: '🌐',
    color: '#7c3aed',
    bgColor: '#f3e8ff',
  },
  {
    id: 'ocio',
    name: 'Ocio',
    icon: '🎬',
    color: '#db2777',
    bgColor: '#fce7f3',
  },
  {
    id: 'salud',
    name: 'Salud',
    icon: '💊',
    color: '#059669',
    bgColor: '#d1fae5',
  },
  {
    id: 'otros',
    name: 'Otros',
    icon: '📦',
    color: '#475569',
    bgColor: '#f1f5f9',
  },
];

export function getCategoryByName(categoryName) {
  return (
    CATEGORIES.find(
      (cat) => cat.name.toLowerCase() === String(categoryName || '').toLowerCase()
    ) || {
      id: 'otros',
      name: categoryName || 'Otros',
      icon: '📦',
      color: '#1d4ed8',
      bgColor: '#eff6ff',
    }
  );
}

export default CATEGORIES;
