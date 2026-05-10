"use client";
import Link from "next/link";
import { useSiteSettings } from "@/context/site-settings-context";

const LIGHT_LOGO = "/assets/kasa-logo-light.png";
const DARK_LOGO = "/assets/kasa-logo-dark.png";

const Logo = ({ footer = false }: { footer?: boolean }) => {
  const { site } = useSiteSettings();
  const lightSrc = site.logoUrl || LIGHT_LOGO;
  const darkSrc = site.footerLogoUrl || DARK_LOGO;
  const lightClassName = footer ? "dark:hidden" : "dark:hidden";

  return (
    <Link
      href="/"
      className="flex min-w-0 items-center justify-center md:justify-start"
    >
      <div className="relative h-14 w-40 sm:h-15 sm:w-40 md:h-16 md:w-45">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={site.siteName || "Kasa logo"}
          src={lightSrc}
          width={250}
          height={60}
          className={`h-full w-auto object-contain ${lightClassName}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={site.siteName || "Kasa logo"}
          src={darkSrc}
          width={250}
          height={60}
          className="hidden h-full w-auto object-contain dark:block"
        />
      </div>
    </Link>
  );
};

export default Logo;
