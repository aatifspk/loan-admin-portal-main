import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import spkLogo from "@/assets/images/logo/spklogo.png";

const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link to="/">
      <img src={isDark ? spkLogo : spkLogo} alt="" className="w-12" />
    </Link>
  );
};

export default MobileLogo;
