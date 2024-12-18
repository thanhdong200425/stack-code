export default function InputField({ type, label, inputName }) {
    return (
        <div className="flex flex-col gap-2 my-[1rem]">
            <label className="text-[#aba8a8]">{label}</label>
            <input type={type} name={inputName} required autoComplete="false" className="p-[0.8rem] text-[1rem] text-black rounded-[0.6rem] border-[1px] border-[#ccc] " />
        </div>
    );
}
