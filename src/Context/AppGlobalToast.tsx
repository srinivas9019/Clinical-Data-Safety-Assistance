import { Box } from "@cloudscape-design/components";
import { createContext, useContext, useState, type ReactNode } from "react";
import ToastPopup from "../components/customToastPopup";
import { PanelLoader } from "../utility";

interface ToastInterface {
  id?: string;
  type: "SUCCESS" | "ERROR" | "WARNING" | "Loading";
  content: string;
}
interface panelLoaderInterface {
  status: boolean;
  title?: string;
}
interface InterfaceAddToast {
  addNewToast: ({ type, content }: ToastInterface) => void;
  showPageLoader: ({ status, title }: panelLoaderInterface) => void;
}

export const ToastContext = createContext<InterfaceAddToast | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState("");

  const showPageLoader = ({ status, title = "" }: panelLoaderInterface) => {
    setShowLoader(status);
    status ? setLoaderMsg(title) : setLoaderMsg("");
  };

  const addNewToast = (params: ToastInterface) => {
    const toastId = "ID_" + new Date().getTime();
    setToasts((prevToast) => [
      ...prevToast,
      { type: params.type, content: params.content, id: toastId },
    ]);

    setTimeout(() => {
      setToasts((prevToast) => prevToast.filter((item) => item.id !== toastId));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addNewToast, showPageLoader }}>
      <Box data-global-toast-container>
        {toasts.map((item) => (
          <ToastPopup key={item.id} {...item} />
        ))}
      </Box>
      {showLoader ? <PanelLoader title={loaderMsg} /> : <></>}
      
      {children}
    </ToastContext.Provider>
  );
};

export const useAppToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
