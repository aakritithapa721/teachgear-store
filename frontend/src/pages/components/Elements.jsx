export function Buttons({label,onclick,className}) {
    return(
        <div>
            <button onClick={onclick}
             className={`${className ? className :
             'bg-green-500 text-white p-2 m-4 rounded-sm'}`}>{label}</button>
        </div>
    )
}


export function Textfields({ text, onChange, placeholder , name }) {
    return (
        <div>
            <input type={text} placeholder={placeholder} name={name}
            onchange={onChange} className='border border-amber-500' />
        </div>
    )
}