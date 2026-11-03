const mockExpenses = [
  {
    id: '1',
    descripcion: 'Supermercado',
    monto: 25000,
    categoria: 'Alimentación',
    fecha: '2026-10-15',
    notas: 'Compra semanal',
  },
  {
    id: '2',
    descripcion: 'Combustible',
    monto: 18000,
    categoria: 'Transporte',
    fecha: '2026-10-18',
    notas: 'Carga de combustible',
  },
  {
    id: '3',
    descripcion: 'Internet',
    monto: 32000,
    categoria: 'Servicios',
    fecha: '2026-10-20',
    notas: 'Pago mensual de internet',
  },
];

export default mockExpenses;


// hacemos esto pq el listado y el detalle van a consultar el mismo arreglo. asi no tenemos que escribir los datos dos veces.
// ej: cuando la persona toque supermercado, vamos a buscar el gasto cuyo id sea 1 y mostrar su informacion. 