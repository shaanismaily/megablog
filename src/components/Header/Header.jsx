import { Logo, Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-3">

          <Link to="/" className="flex items-center gap-2">
            <Logo width="60px" className="rounded-lg" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-gray-700 hover:text-black font-medium transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-4 border-t">
            <ul className="flex flex-col gap-3 pt-4">
              {navLinks.map(
                (item) =>
                  item.active && (
                    <li key={item.slug}>
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;