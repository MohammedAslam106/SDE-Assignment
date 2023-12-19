import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react"

interface layoutProps{
    children:ReactNode
}

export default function layout({children}:layoutProps ){
    return(
        <>
            <Sidebar/>
            <div className=" ml-[25%] px-16 py-8">
                {children}
            </div>
        </>
    )
}