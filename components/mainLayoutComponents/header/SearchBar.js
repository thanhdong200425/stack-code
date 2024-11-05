import Image from "next/image";

export default function SearchBar({name, placeholder, setIsFocused}) {
    return <div className='flex items-center p-2 border border-slate-300 hover:border-indigo-300 rounded-md w-[35rem]'>
        <button>
            <Image src={"/icons/search-icon.svg"} alt={"Search icon"} width={20} height={20}/>
        </button>
        <input type="text" placeholder={placeholder}
               className="w-[100%] px-2 focus:outline-none" name={name} onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}/>
    </div>
}