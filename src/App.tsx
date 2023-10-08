import "@/App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "@/pages/Home";
import Scrap from "@/pages/Scrap";

import { URL } from "@/constants/url";
import Layout from "@/components/layout/Layout";
import Modal from "@/components/ui/Modal";
import ErrorBoundary from "@/components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ErrorBoundary>
            <Layout>
              <Modal />
              <Routes>
                <Route path={URL.HOME} element={<Home />} />
                <Route path={URL.SCRAP} element={<Scrap />} />
              </Routes>
            </Layout>
          </ErrorBoundary>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
