import { getCategoryByName } from '../data/categories';
import './CategoryBadge.css';

//componente reutilizable para mostrar la categoría de un gasto. lo usamos en el detalle del gasto y en la lista de gastos

function CategoryBadge({ categoria }) {
  const categoryInfo = getCategoryByName(categoria);

  return (
    <span
      className="category-badge"
      style={{
        backgroundColor: categoryInfo.bgColor,
        color: categoryInfo.color,
      }}
    >
      <span aria-hidden="true" style={{ marginRight: '4px' }}>
        {categoryInfo.icon}
      </span>
      {categoryInfo.name}
    </span>
  );
}

export default CategoryBadge;

