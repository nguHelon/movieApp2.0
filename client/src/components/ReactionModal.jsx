

const ReactionModal = ({ message }) => {
  return (
    <div className="absolute top-5 left-2/4 -translate-x-1/2 flex-1 py-2 px-4 rounded-lg bg-primaryGray border border-green-700 text-lightGray2 font-medium">
        <p>{message}</p>
    </div>
  )
}

export default ReactionModal