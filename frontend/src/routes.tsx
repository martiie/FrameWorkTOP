import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminCMS/AdminDashboard';
import AdminSettings from './pages/AdminCMS/AdminSettings';
import AdminReports from './pages/AdminCMS/AdminReports';
import ManageZones from './pages/AdminCMS/ManageZones';
import ManageCameras from './pages/AdminCMS/ManageCameras';
import TAPage from './pages/TA/TAPage';
import SGPage from './pages/SG/SGPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './Auth/ProtectedRoute';
import Home from './pages/Homes';
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
                <Route path="/admin/zones" element={<ProtectedRoute allowedRoles={['admin']}><ManageZones /></ProtectedRoute>} />
                <Route path="/admin/cameras" element={<ProtectedRoute allowedRoles={['admin']}><ManageCameras /></ProtectedRoute>} />
                <Route path="/ta" element={<ProtectedRoute allowedRoles={['ta']}><TAPage /></ProtectedRoute>} />
                <Route path="/sg" element={<ProtectedRoute allowedRoles={['student']}><SGPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
