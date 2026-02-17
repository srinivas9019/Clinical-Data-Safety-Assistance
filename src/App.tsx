import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppGlobalDataProvider } from "./Context/AppGlobalData";
import { ToastProvider } from "./Context/AppGlobalToast";
import "./components/PanelLoader/panelLoader.css";
import { AuthProvider } from "./Cognito-Auth/AuthContext";

import AppRoutes from "./appRoutes";
function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <AppGlobalDataProvider>
            <Router>
              <AppRoutes />
            </Router>
          </AppGlobalDataProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
