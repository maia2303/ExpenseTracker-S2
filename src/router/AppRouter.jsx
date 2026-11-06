import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import HomeScreen from '../pages/HomeScreen';
import ExpensesScreen from '../pages/ExpensesScreen';
import ExpenseDetailScreen from '../pages/ExpenseDetailScreen';
import SettingsScreen from '../pages/SettingsScreen';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}> {/* Todas las rutas se envuelven en el layout principal */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/expenses" element={<ExpensesScreen />} />
          <Route
            path="/expenses/:id"
            element={<ExpenseDetailScreen />}
          />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

// el :id indica que la direccion recibe un identificador variable. despues, useParams. lo lee deentro de expensedetailScreen 