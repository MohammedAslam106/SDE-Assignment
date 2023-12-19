interface GeneralProps{
    
}

export default function General({}:GeneralProps ){
    return(
        <>
            <div className=' flex flex-col justify-center gap-3 mt-8'>
                <label className=" font-semibold text-lg ">
                    Chatbot Name
                    <input type="text" className=" mt-3 w-full border border-gray-400 outline-none px-4 py-2 rounded-md shadow-sm " />
                    <p className=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur.</p>
                </label>
                <label className=" font-semibold text-lg ">
                    Welcome Message
                    <input type="text" className=" mt-3 w-full border border-gray-400 outline-none px-4 py-2 rounded-md shadow-sm " />
                    <p className=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur.</p>
                </label>
                <label className=" font-semibold text-lg ">
                    Input Placeholder
                    <input type="text" className=" mt-3 w-full border border-gray-400 outline-none px-4 py-2 rounded-md shadow-sm " />
                    <p className=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur.</p>
                </label>
            </div>
        </>
    )
}