

const ReactionModal = ({ message }) => {
  return (
    <div className="absolute top-5 left-2/4 -translate-x-1/2 flex-1 py-1 px-2 rounded-lg bg-primaryGray border border-green-700 text-lightGray2 font-medium text-[10px] md:text-lg md:py-2 md:px-4 box-shadwo1">
        <p>{message}</p>
    </div>
  )
}

export default ReactionModal