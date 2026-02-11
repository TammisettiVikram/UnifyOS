import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';

function App() {
  return (
    <BrowserRouter>
      <div className="text-slate-50 font-sans antialiased">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/" element={<Navigate to="/onboarding" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;