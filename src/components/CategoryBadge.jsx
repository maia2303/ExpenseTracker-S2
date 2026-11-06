import './CategoryBadge.css';

//componente reutilizable para mostrar la categoría de un gasto. lo usamos en el detalle del gasto y en la lista de gastos

function CategoryBadge({ categoria }) {
  return (
    <span className="category-badge">
      {categoria}
    </span>
  );
}

export default CategoryBadge;

