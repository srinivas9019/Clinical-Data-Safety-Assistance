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
      <AppGlobalDataProvider>
        <ToastProvider>
          <AuthProvider>
            <Router>
              <AppRoutes />
            </Router>
          </AuthProvider>
        </ToastProvider>
      </AppGlobalDataProvider>
    </>
  );
}

export default App;
