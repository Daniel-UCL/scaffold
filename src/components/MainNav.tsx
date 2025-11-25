"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/membership-dashboard", label: "Membership Dashboard" },
  { href: "/ixn-workflow-manager", label: "IXN Workflow Manager" },
  { href: "/talent-discovery", label: "Talent Discovery" },
  { href: "/sign-in", label: "Sign in" },
];

export default function MainNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user;
  const isAuthenticated = status === "authenticated";

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-nav">
        <div className="site-brand">
          <Link href="/">Alliances Platform</Link>
        </div>

        <ul className="nav-list">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            // Optionally hide "Sign in" when already logged in
            if (item.href === "/sign-in" && isAuthenticated) {
              return null;
            }

            return (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "nav-link nav-link--active" : "nav-link"}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="nav-user">
          {isAuthenticated && user ? (
            <>
              <span className="nav-user__label">
                Signed in as {user.name ?? user.email}
              </span>
              <button
                type="button"
                className="nav-button"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </>
          ) : (
            <span className="nav-user__label">Not signed in</span>
          )}
        </div>
      </nav>
    </header>
  );
}
