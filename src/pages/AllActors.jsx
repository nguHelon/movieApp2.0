import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetActorsQuery } from "../store/services/tmdbAPI";
import ActorView from "../components/ActorView";


const AllActors = () => {
  const {data, isFetching} = useGetActorsQuery();

  if (isFetching) return <Loader title="Loading actors..." />

  return (
    <div className="w-full px-5 py-7">
        <div className="w-full">
            <div className="w-full flex items-center justify-start mb-4">
                <h1 className="text-white font-bold text-2xl">Popular Actors</h1>
            </div>
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                {
                    data?.results?.map((actor) => {
                        return <ActorView 
                            key={actor.id}
                            actorId={actor.id}
                            name={actor.name}
                            profilePath={actor.profile_path}
                            knownfor={actor.known_for}
                        />
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default AllActors