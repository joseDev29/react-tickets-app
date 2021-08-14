import { SocketProvider } from "./context/SocketContext";
import { UIProvider } from "./context/UIContext";
import { RouterPage } from "./pages/RouterPage";

export const App = () => {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />
      </UIProvider>
    </SocketProvider>
  );
};
