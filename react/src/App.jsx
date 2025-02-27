import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';

const App = () => {
  return (
      <Routes>
        {ROUTES.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
  );
};

export default App;