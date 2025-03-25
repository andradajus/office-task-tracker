import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import WebSocketTest from './pages/WebSocketTest';

const App = () => {
  return (
    <Routes>
      {ROUTES.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route path="/test-websocket" element={<WebSocketTest />} />
    </Routes>
  );
};

export default App;
