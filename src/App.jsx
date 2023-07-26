import Header from "./components/Header"
import Sidebar from "./components/Sidebar"


const App = () => {
  return (
    <div className="w-full h-auto">
      <Sidebar />

      <div className="">
        <Header />
      </div>

    </div>
  )
}

export default App