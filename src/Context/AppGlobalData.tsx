import { createContext, useContext, useState, type ReactNode } from "react";

interface InterfaceAddToast {
  setAppGlobalData: (data: any) => void;
  appGlobalData: any;
}

export const appGlobalDataContext = createContext<InterfaceAddToast | null>(
  null,
);

export const AppGlobalDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [appGlobalData, setAppGlobalData] = useState<any>(null);

  // const setGlobalContextData = (data: any) => {
  //   // setAppGlobalData((prevData: any) => ({ ...prevData, ...data }));
  // };

  return (
    <appGlobalDataContext.Provider
      value={{ setAppGlobalData, appGlobalData }}
    >
      {children}
    </appGlobalDataContext.Provider>
  );
};

export const useGlobalContext = () => {
  const ctx = useContext(appGlobalDataContext);
  if (!ctx) {
    throw new Error(
      "useGlobalContext must be used within a AppGlobalDataProvider",
    );
  }
  return ctx;
};
