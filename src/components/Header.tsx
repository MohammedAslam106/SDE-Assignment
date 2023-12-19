import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps{
    title:string
}

export default function Header({title}:HeaderProps ){
    return(
        <div className=''>
            <div className=" flex justify-between items-center">
                    <div className=" flex justify-start items-center gap-2 font-semibold text-2xl">
                        <Link href={'/'}>
                            <FontAwesomeIcon icon={faHome} color="#7E22CE" />
                        </Link>
                        {title!='/ Account Settings'&&<h2 className="  text-gray-400">/ Sample Project /</h2>}
                        <h2 className=" text-purple-600  text-lg">{title}</h2>
                    </div>
                    <div className=" flex justify-center items-center gap-4">
                        <div className=" flex justify-center items-center gap-2">
                            <Image className=" w-6" unoptimized src={'/Vector.png'} alt="not found" width={100} height={100}/>
                            <h1 className=" text-2xl font-bold">EN</h1>
                            <Image className=" w-12 h-12 rounded-full" unoptimized src={'/flag.png'} alt="not found" width={100} height={100}/>
                        </div>
                        <Image className=" w-12 h-12 rounded-full" unoptimized src={'/Bell.svg'} alt="not found" width={100} height={100}/>
                    </div>
                </div>
        </div>
    )
}