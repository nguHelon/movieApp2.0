import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/pages"

const App = () => {
  return (
    <div className="w-full h-auto flex bg-primaryGray">
      <Sidebar />

      <div className="">
        <Header />

        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App