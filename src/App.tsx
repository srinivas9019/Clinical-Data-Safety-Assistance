import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppGlobalDataProvider } from "./Context/AppGlobalData";
import { ToastProvider } from "./Context/AppGlobalToast";
import "./components/PanelLoader/panelLoader.css";
import { AuthProvider } from "./Cognito-Auth/AuthContext";
// import { Provider } from "react-redux";
import AppRoutes from "./appRoutes";
import { Provider } from "react-redux";
import { chatStore } from "./react-redux/chatStore";
// import { chatStore } from "./react-redux/chatStore";
function App() {
  return (
    <>
      <ToastProvider>
        <Provider store={chatStore}>
          <AuthProvider>
            <AppGlobalDataProvider>
              <Router>
                <AppRoutes />
              </Router>
            </AppGlobalDataProvider>
          </AuthProvider>
        </Provider>
      </ToastProvider>
    </>
  );
}

export default App;
