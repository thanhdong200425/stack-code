export default function SelectButton({ options, onChangeValue }) {
    const handleChange = (event) => {
        onChangeValue(event.target.value);
    };

    return (
        <div className="mb-2">
            <select name="options" className="border rounded p-2 focus:outline-none text-sm" onChange={handleChange}>
                {options.map((opt) => {
                    return (
                        <option key={opt} value={opt.toLowerCase()} className="capitalize text-sm">
                            {opt}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
