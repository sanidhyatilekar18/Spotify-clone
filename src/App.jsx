import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto h-screen">
        <Routes>
          <Route path="/" element={<Discover />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
