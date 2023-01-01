export default function Success ({message}) {
    return (
        <>
        <div className="container mx-auto transition duration-1000 ease-in-out success">
            <div className="flex justify-center w-64 py-2 mx-auto my-4 text-center text-gray-900 border border-yellow-200 rounded-sm text-md bg-opacity-5">
                <span className="text-white">{message}</span>
            </div>
        </div>
        </>
    )
}