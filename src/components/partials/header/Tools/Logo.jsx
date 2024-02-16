import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
import spkLogo from "@/assets/images/logo/spklogo.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/layout/dashboard">
        {width >= breakpoints.xl ? (
          <img src={isDark ? spkLogo : spkLogo} alt="" className="w-10" />
        ) : (
          <img src={isDark ? spkLogo : spkLogo} alt="" className="w-10" />
        )}
      </Link>
    </div>
  );
};

export default Logo;
