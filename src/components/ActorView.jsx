
const ActorView = ({ actorId, name, profilePath, knownfor}) => {
    return (
            <div className="flex-auto max-w-[250px] bg-secondaryGray rounded-lg p-3">
                <img src={`https://image.tmdb.org/t/p/original${profilePath}`} alt="" className="rounded-lg" />
                <h1 className="text-white font-bold text-xl">{name}</h1>
                <p className="text-lightGray2 truncate">{knownfor.map(value => value.original_title ? value.original_title + "," : value.original_name + ",")}</p>
            </div>
    )
}

export default ActorView;