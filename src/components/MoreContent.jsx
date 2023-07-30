import { Link } from "react-router-dom"
import { useGetPopularMoviesQuery } from "../store/services/tmdbAPI"
import PeopleList from "./PeopleList"

const MovieInfo = ({ index, movieName, releaseDate, posterPath }) => {
    return (
        <div className="w-full flex items-center justify-start p-2 rounded-lg bg-secondaryGray hover:border hover:border-lightGray1">
            <h3 className="text-lightGray2 font-bold mr-2">{index + 1}.</h3>
            <div className="flex-1 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={`https://image.tmdb.org/t/p/original${posterPath}`} alt="" className="flex-none h-[50px] w-[50px] rounded-xl md:h-[60px] md:w-[70px]" />
                    <div className="flex flex-col ml-2">
                        <h1 className="font-bold text-white text-sm md:text-xl">{movieName.length > 18 ? movieName.substring(0, 18) + "..." : movieName}</h1>
                        <h3 className="font-semibold text-lightGray2 text-xs">{releaseDate}</h3>
                    </div>
                </div>
                <Link className="py-1 px-2 text-black font-bold text-sm bg-mainorange rounded-full">View</Link>
            </div>
        </div>
    )
}

const MoreContent = () => {
  const {data} = useGetPopularMoviesQuery();

  return (
    <div className="w-full flex flex-col justify-center ss:flex-row ss:w-full ss:space-x-2 md:flex-col md:justify-start md:w-[350px]">
        <div className="w-full flex flex-col">
            <div className="w-full flex justify-between items-center mb-2 p-2">
                <h1 className="text-white font-bold text-xl md:text-2xl">Popular Trailers</h1>
                <Link className="text-lightGray2 text-sm">See more</Link>
            </div>
            <div className="flex flex-col gap-1 min-w-[280px] md:w-full">
                {
                    data?.results?.slice(0, 4).map((movie, i) => {
                        return <MovieInfo 
                            key={movie.id}
                            index={i}
                            movieName={movie.original_title}
                            releaseDate={movie.release_date}
                            posterPath={movie.poster_path}
                        />
                    })
                }         
            </div>
        </div>

        <PeopleList />
    </div>
  )
}

export default MoreContent