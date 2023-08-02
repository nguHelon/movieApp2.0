import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from "react-router-dom"
import { Actors, AllPopular, AllUpcoming, Home } from "./pages/pages"

const App = () => {
  return (
    <div className="w-full h-auto flex bg-primaryGray relative">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="px-5 h-[calc(100vh-57px)]  overflow-y-scroll hide-scrollbar">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popularMovies" element={<AllPopular />} />
            <Route path="/upcomingMovies" element={<AllUpcoming />} />
            <Route path="/actors" element={<Actors />} />
          </Routes>
        </div>
      </div>

    </div>
  )
}

export default App