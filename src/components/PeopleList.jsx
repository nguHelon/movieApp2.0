import { Link } from "react-router-dom"
import { useGetActorsQuery } from "../store/services/tmdbAPI"

const PeopleList = () => {
  const { data } = useGetActorsQuery();

  return (
    <div className="flex flex-col">
        <div className="w-full flex justify-between items-center mb-2 p-2">
            <h1 className="text-white font-bold text-xl md:text-2xl">Actors</h1>
            <Link to="/actors" className="text-lightGray2 text-sm">See more</Link>
        </div>
        <div className="flex flex-wrap gap-2 ss:justify-center">
            {
                data?.results?.slice(0, 9).map((actor) => {
                    return (
                        <Link
                            key={actor.id}
                        >
                            <img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt="" className="h-[70px] w-[70px] rounded-full md:h-[100px] md:w-[100px]" />
                        </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PeopleList