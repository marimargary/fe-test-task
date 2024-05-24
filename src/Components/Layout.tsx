import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import Toast from "./UI/Toast";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const toasts = useSelector((state: RootState) => state.main.toasts.toasts);

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden">
      <Header />
      {children}
      <div className="fixed z-[9999] right-4 bottom-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast {...toast} key={toast.id} />
        ))}
      </div>
    </div>
  );
};

export default Layout;
