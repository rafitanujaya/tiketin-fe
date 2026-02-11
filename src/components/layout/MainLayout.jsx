import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { RegisterModal } from "../RegisterModal";

export const MainLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const [authType, setAuthType] = useState(null); 

  const openLogin = () => setAuthType("login");
  const openRegister = () => setAuthType("register");
  const closeAuth = () => setAuthType(null);

  return (
    <>
      <Navbar
        isLanding={isLanding}
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
      />

      <Outlet />

      <Footer />

      {authType === "login" && (
        <LoginModal
          onClose={closeAuth}
          onSwitchMode={() => setAuthType("register")}
        />
      )}

      {authType === "register" && (
        <RegisterModal
          onClose={closeAuth}
          onSwitchMode={() => setAuthType("login")}
        />
      )}
    </>
  );
};
