export default function Success ({message}) {
    return (
        <>
        <div style={{
            position:'absolute',
            top:'20px'
        }} className="container mx-auto transition duration-1000 ease-in-out success">
            <div className="flex justify-center w-64 py-2 mx-auto my-4 text-center bg-white rounded-sm text-md">
                <span className="text-xl text-black">{message}</span>
            </div>
        </div>
        </>
    )
}