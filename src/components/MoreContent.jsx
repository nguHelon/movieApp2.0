import { transformers, harvey } from "../assets/index"
import { Link } from "react-router-dom"
import { useGetPopularMoviesQuery } from "../store/services/tmdbAPI"

const MovieInfo = () => {
    // const {data, isFetching, error} = useGetPopularMoviesQuery();

    return (
        <div className="w-full flex items-center justify-start p-2 rounded-lg bg-secondaryGray hover:border hover:border-lightGray1">
            <h3 className="text-lightGray2 font-bold mr-2">1.</h3>
            <div className="flex-1 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={transformers} alt="" className="flex-none h-[80px] w-[80px] rounded-xl" />
                    <div className="flex flex-col ml-2">
                        <h1 className="font-bold text-white text-xl">Transformers</h1>
                        <h3 className="font-semibold text-lightGray2 text-sm">Nov 2002</h3>
                    </div>
                </div>
                <Link className="py-1 px-3 text-black font-bold text-sm bg-mainorange rounded-full">View</Link>
            </div>
        </div>
    )
}

const MoreContent = () => {
  return (
    <div className="w-[350px]">
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center mb-2 p-2">
                <h1 className="text-white font-bold text-2xl">Popular Trailers</h1>
                <Link className="text-lightGray2 text-sm">See more</Link>
            </div>
            <div className="flex flex-col gap-1">
                <MovieInfo />
                <MovieInfo />
                <MovieInfo />
                <MovieInfo />          
            </div>
        </div>

        <div className="flex flex-col">
           <div className="w-full flex justify-between items-center mb-2 p-2">
                <h1 className="text-white font-bold text-2xl">Actors</h1>
                <Link className="text-lightGray2 text-sm">See more</Link>
            </div>
            <div className="flex flex-wrap gap-2">
                <Link>
                    <img src={harvey} alt="" className="h-[100px] w-[100px] rounded-full" />
                </Link>
                <Link>
                    <img src={harvey} alt="" className="h-[100px] w-[100px] rounded-full" />
                </Link>
                <Link>
                    <img src={harvey} alt="" className="h-[100px] w-[100px] rounded-full" />
                </Link>
                <Link>
                    <img src={harvey} alt="" className="h-[100px] w-[100px] rounded-full" />
                </Link>
                <Link>
                    <img src={harvey} alt="" className="h-[100px] w-[100px] rounded-full" />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MoreContent