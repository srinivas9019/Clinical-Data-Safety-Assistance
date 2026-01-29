import { Box } from "@cloudscape-design/components";
import { createContext, useContext, useState, type ReactNode } from "react";
import ToastPopup from "../components/customToastPopup";



interface ToastInterface {
  id?: string;
  type: "SUCCESS" | "ERROR" | "WARNING" | "Loading";
  content: string;
}
interface InterfaceAddToast {
  addNewToast: ({type, content}:ToastInterface) => void;
}

export const ToastContext = createContext<InterfaceAddToast | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  

  const addNewToast = (params:ToastInterface) => {
    const toastId = "ID_" + new Date().getTime();
    setToasts((prevToast) => [...prevToast, { type:params.type, content:params.content, id: toastId }]);

    setTimeout(() => {
      setToasts((prevToast) => prevToast.filter((item) => item.id !== toastId));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addNewToast }}>
      <Box data-global-toast-container>
        {toasts.map((item) => (
          <ToastPopup key={item.id} {...item} />
        ))}
      </Box>
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
