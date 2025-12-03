// src/components/MainNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  navRootConfig,
  serviceNavConfig,
  type Audience,
  type ServiceNavConfig,
} from "@/content/navConfig";
import { pageCopy } from "@/content/pageCopy";

function getServiceLabel(service: ServiceNavConfig): string {
  // If this service is linked to pageCopy, use the page title where available
  const fromPageCopy = service.pageKey
    ? pageCopy[service.pageKey]?.title
    : undefined;

  return service.navLabel ?? fromPageCopy ?? service.title;
}

function getServicesForAudience(audience: Audience): ServiceNavConfig[] {
  return serviceNavConfig
    .filter(
      (svc) => svc.audiences.includes(audience) && svc.active !== false,
    )
    .sort((a, b) => getServiceLabel(a).localeCompare(getServiceLabel(b)));
}

export default function MainNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user;
  const isAuthenticated = status === "authenticated";
  const displayName = user?.name ?? user?.email ?? "your account";

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const closeMenus = () => setOpenMenu(null);

  const renderAudienceDropdown = (audience: Audience, label: string) => {
    const services = getServicesForAudience(audience);

    if (services.length === 0) {
      // If nothing configured yet, don’t render an empty dropdown
      return null;
    }

    const id = audience;
    const isOpen = openMenu === id;

    return (
      <li className="nav-item has-submenu" role="none" key={`aud-${audience}`}>
        <button
          className="menu-button"
          id={`btn-${id}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={`menu-${id}`}
          type="button"
          onClick={() => toggleMenu(id)}
          onBlur={closeMenus}
        >
          {label}
        </button>
        <ul
          className="menu-panel"
          id={`menu-${id}`}
          role="menu"
          aria-labelledby={`btn-${id}`}
          hidden={!isOpen}
        >
          {services.map((svc) => {
            const label = getServiceLabel(svc);

            if (svc.active === false) {
              return (
                <li role="none" key={svc.key}>
                  <span
                    role="menuitem"
                    className="nav-link disabled"
                    aria-disabled="true"
                    tabIndex={-1}
                  >
                    {label}
                  </span>
                </li>
              );
            }

            const isActive = pathname.startsWith(svc.href);

            return (
              <li role="none" key={svc.key}>
                <Link
                  href={svc.href}
                  role="menuitem"
                  className={
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                  onClick={closeMenus}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  };

  const renderAccountItem = () => {
    // Logged OUT: simple Sign in link
    if (!isAuthenticated) {
      const isActive = pathname.startsWith("/sign-in");
      return (
        <li className="nav-item" role="none" key="nav-account-signed-out">
          <Link
            href="/sign-in"
            role="menuitem"
            className={isActive ? "nav-link nav-link--active" : "nav-link"}
          >
            Sign in
          </Link>
        </li>
      );
    }

    // Logged IN: Account dropdown
    const id = "account";
    const isOpen = openMenu === id;

    return (
      <li className="nav-item has-submenu" role="none" key="nav-account">
        <button
          className="menu-button"
          id={`btn-${id}`}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={`menu-${id}`}
          type="button"
          onClick={() => toggleMenu(id)}
          onBlur={closeMenus}
        >
          Account
        </button>
        <ul
          className="menu-panel"
          id={`menu-${id}`}
          role="menu"
          aria-labelledby={`btn-${id}`}
          hidden={!isOpen}
        >
          <li role="none">
            <span
              role="menuitem"
              className="nav-link disabled"
              aria-disabled="true"
              tabIndex={-1}
            >
              You are signed in as {displayName}
            </span>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="nav-link nav-link--button"
              onClick={() => {
                closeMenus();
                void signOut();
              }}
            >
              Sign out
            </button>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <nav aria-label="Primary" className="nav-bar">
      <ul className="nav-root" role="menubar">
        {navRootConfig.map((item, index) => {
          if (item.type === "link") {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li className="nav-item" role="none" key={`root-${index}`}>
                <Link
                  href={item.href}
                  role="menuitem"
                  className={isActive ? "nav-link nav-link--active" : "nav-link"}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          if (item.type === "audienceDropdown") {
            return renderAudienceDropdown(item.audience, item.label);
          }

          if (item.type === "account") {
            return renderAccountItem();
          }

          if (item.type === "contact") {
            const isActive = pathname.startsWith(item.href);
            return (
              <li className="nav-item" role="none" key={`contact-${index}`}>
                <Link
                  href={item.href}
                  role="menuitem"
                  className={isActive ? "nav-link nav-link--active" : "nav-link"}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}
