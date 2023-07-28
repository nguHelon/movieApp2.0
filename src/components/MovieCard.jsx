import { BsInfoCircle } from "react-icons/bs"

const MovieCard = () => {
  return (
    <div className={` bg-[url('../src/assets/blackPanther.jpg')] bg-center bg-cover h-[220px] w-[350px] rounded-lg relative`}>
        <div className="absolute left-0 bottom-0 w-full rounded-b-lg flex justify-between items-center px-3 py-2 backdrop-blur-lg">
            <div className="flex items-center space-x-3">
                <span className="p-2 rounded-full bg-mainorange"><BsInfoCircle className="text-white text-md font-bold"/></span>
                <div className="">
                    <h1 className="text-white font-bold leading-3">Black Panther II</h1>
                    <span className="text-lightGray2 text-sm font-semibold">Nov 2022</span>
                </div>
            </div>
            <div className="font-bold text-black text-sm bg-white rounded-full px-3 py-1">
                180 min
            </div>
        </div>
    </div>
  )
}

export default MovieCard