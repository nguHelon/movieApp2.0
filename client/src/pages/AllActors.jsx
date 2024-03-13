import { lazy, Suspense } from "react";
import ActorViewFallback from "../components/ActorViewFallback";
import { useGetActorsQuery } from "../store/services/tmdbAPI";

const ActorView = lazy(() => import("../components/ActorView"));

const AllActors = () => {
  const {data} = useGetActorsQuery();

  return (
    <div className="w-full px-5 py-7">
        <div className="w-full">
            <div className="w-full flex items-center justify-start mb-4">
                <h1 className="text-white font-bold text-2xl">Popular Actors</h1>
            </div>
            <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                {
                    data?.results?.map((actor) => {
                        return (
                            <Suspense key={actor.id} fallback={<ActorViewFallback />}>
                                <ActorView                                     
                                    actorId={actor.id}
                                    name={actor.name}
                                    profilePath={actor.profile_path}
                                    knownfor={actor.known_for}
                                />
                            </Suspense>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default AllActors