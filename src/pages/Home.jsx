import Upcoming from "../components/Upcoming"
import MoreContent from "../components/MoreContent"

const Home = () => {
  return (
    <div className="flex py-5">
      <Upcoming />
      <MoreContent />
    </div>
  )
}

export default Home