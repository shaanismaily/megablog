import { useEffect, useState } from "react";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({
              userData: JSON.parse(JSON.stringify(userData)),
            })
      )} else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.log("Auth error", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  ) : null;
}

export default App;
