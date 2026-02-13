import "./App.css";
import MainLayout from "./components/MainLayout";
import { AppGlobalDataProvider } from "./Context/AppGlobalData";
import { ToastProvider } from "./Context/AppGlobalToast";
import "./components/PanelLoader/panelLoader.css"
function App() {
  return (
    <>
      <AppGlobalDataProvider>
        <ToastProvider>
          <MainLayout />
        </ToastProvider>
      </AppGlobalDataProvider>
    </>
  );
}

export default App;
