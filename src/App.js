import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToHash from "./components/ScrollToHash";
import Toaster from "./components/ui/toaster";
import { ToastProvider } from "./hooks/use-toast";
import AppLayout from "./layouts/AppLayout";

import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TourDetailsPage from "./pages/TourDetailsPage";
import ToursPage from "./pages/ToursPage";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tours" element={<ToursPage />} />
            <Route path="tours/:id" element={<TourDetailsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
