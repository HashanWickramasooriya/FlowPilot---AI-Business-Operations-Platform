import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AppDataProvider } from "./context/AppDataContext";

import Home from "./pages/marketing/Home";
import Features from "./pages/marketing/Features";
import Solutions from "./pages/marketing/Solutions";
import Pricing from "./pages/marketing/Pricing";
import Integrations from "./pages/marketing/Integrations";
import Blog from "./pages/marketing/Blog";
import About from "./pages/marketing/About";
import Contact from "./pages/marketing/Contact";
import Login from "./pages/marketing/Login";
import Signup from "./pages/marketing/Signup";
import NotFound from "./pages/NotFound";

import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Projects from "./pages/dashboard/Projects";
import Tasks from "./pages/dashboard/Tasks";
import Customers from "./pages/dashboard/Customers";
import Team from "./pages/dashboard/Team";
import CalendarPage from "./pages/dashboard/Calendar";
import Analytics from "./pages/dashboard/Analytics";
import Assistant from "./pages/dashboard/Assistant";
import Reports from "./pages/dashboard/Reports";
import Notifications from "./pages/dashboard/Notifications";
import Settings from "./pages/dashboard/Settings";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="projects" element={<Projects />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="customers" element={<Customers />} />
                <Route path="team" element={<Team />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="assistant" element={<Assistant />} />
                <Route path="reports" element={<Reports />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppDataProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
