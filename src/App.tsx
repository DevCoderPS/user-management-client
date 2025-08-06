import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "./components/Notifications";
import UserPage from "./pages/user/UserPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<UserPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      {/* Notifications Component */}
      <Notifications />
    </QueryClientProvider>
  );
}

export default App;
