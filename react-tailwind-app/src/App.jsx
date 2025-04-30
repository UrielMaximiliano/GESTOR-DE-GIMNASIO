import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Routines from './pages/Routines';
import Memberships from './pages/Memberships';
import Payments from './pages/Payments';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
