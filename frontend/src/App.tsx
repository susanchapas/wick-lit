import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import { Embers } from "./components/Brand";
import { NavBar } from "./components/NavBar";
import { isOnboarded } from "./lib/settings";
import { Access } from "./screens/Access";
import { Clearing } from "./screens/Clearing";
import { ContentNote } from "./screens/ContentNote";
import { CreateScenario } from "./screens/CreateScenario";
import { FieldGuide } from "./screens/FieldGuide";
import { Grove } from "./screens/Grove";
import { Journey } from "./screens/Journey";
import { Result } from "./screens/Result";
import { Settings } from "./screens/Settings";
import { SteppingIn } from "./screens/SteppingIn";
import { Trails } from "./screens/Trails";
import { Welcome } from "./screens/Welcome";

function RouteFocus() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const h1 = document.querySelector("h1");
    h1?.setAttribute("tabindex", "-1");
    h1?.focus();
  }, [pathname]);
  return null;
}

function Backdrop() {
  return (
    <div className="backdrop">
      <Embers count={8} />
    </div>
  );
}

const RequireOnboarded = () => (isOnboarded() ? <Outlet /> : <Navigate to="/welcome" replace />);

function Shell() {
  return (
    <div className="shell">
      <a className="wk-btn wk-btn--frost skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />
      <main id="main" className="page">
        <Outlet />
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <RouteFocus />
      <Backdrop />
      <Routes>
        <Route path="welcome" element={<Welcome />} />
        <Route path="welcome/access" element={<Access />} />
        <Route path="welcome/stepping-in" element={<SteppingIn />} />
        <Route element={<RequireOnboarded />}>
          <Route element={<Shell />}>
            <Route index element={<Grove />} />
            <Route path="trails" element={<Trails />} />
            <Route path="trails/create" element={<CreateScenario />} />
            <Route path="journey" element={<Journey />} />
            <Route path="lanterns" element={<Navigate to="/journey" replace />} />
            <Route path="guide" element={<FieldGuide />} />
            <Route path="settings" element={<Settings />} />
            <Route path="trails/:id/result" element={<Result />} />
          </Route>
          <Route path="trails/:id" element={<ContentNote />} />
          <Route path="trails/:id/clearing" element={<Clearing />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
