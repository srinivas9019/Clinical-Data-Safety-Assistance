import "./App.css";
import MainLayout from "./components/MainLayout";
import { ToastProvider } from "./Context/AppGlobalToast";

function App() {
  return (
    <>
      <ToastProvider>
        <MainLayout />
      </ToastProvider>
    </>
  );
}

export default App;
