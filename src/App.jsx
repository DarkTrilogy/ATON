import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Register from "./pages/Register";
import Clients from "./pages/Clients";
import Client from "./pages/Client";
import { LocalizationProvider } from "./context/LocalizationContext";
import WelcomePage from "./pages/WelcomePage";
import NewPassword from "./pages/NewPassword";
import ClientCreate from "./pages/ClientCreate";
import ChangeClientTable from "./features/clients/ChangeClientTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <LocalizationProvider>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to={"welcome"} />} />
                <Route path="welcome" element={<WelcomePage />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:clientId" element={<Client />} />
                <Route
                  path="clients/change/:clientId"
                  element={<ChangeClientTable />}
                />
                <Route path="client/:new" element={<ClientCreate />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="newpassword" element={<NewPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </LocalizationProvider>
  );
}

export default App;
