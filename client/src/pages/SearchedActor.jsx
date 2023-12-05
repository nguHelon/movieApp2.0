import { useParams } from "react-router-dom";
import ActorView from "../components/ActorView";
import { useGetSearchedActorQuery } from "../store/services/tmdbAPI";
import Loader from "../components/Loader";

const SearchedActor = () => {
  const { searchTerm } = useParams();
  const { data, isFetching } = useGetSearchedActorQuery({ searchTerm });

  if (isFetching) return <Loader />;

  return (
    <div className="w-full px-5 py-7">
        <div className="w-full">
            <div className="w-full flex items-center justify-start mb-4">
                <h1 className="text-white font-bold text-2xl">Search results for {`"${searchTerm}"`}</h1>
            </div>
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                {
                    data?.results?.map((actor) => {
                        if (actor.profile_path) return <ActorView 
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

export default SearchedActor