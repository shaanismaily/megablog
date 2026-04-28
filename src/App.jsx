import { Footer, Header } from "./components/index"
import { Outlet } from "react-router"
function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
