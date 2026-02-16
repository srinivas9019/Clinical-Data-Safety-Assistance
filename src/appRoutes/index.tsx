import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import { useAuth } from "../Cognito-Auth/AuthContext";
import MainLayout from "../components/MainLayout";
import SsoLogin from "../Cognito-Auth/SSOLogin";
import Login from "../Cognito-Auth/Login";
import MainChatPage from "../pages/MainChatPage";


const PublicRoute: React.FC = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

function ProtectedRoute() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sso-login" element={<SsoLogin />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainChatPage />} />
          
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
