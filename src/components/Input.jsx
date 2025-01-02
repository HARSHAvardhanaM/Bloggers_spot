import React, { useId } from 'react'

function Input(
    { label,
        type = "text",
        className = '',
        ...props }, ref
) {

    let id = useId();

    return (
        <div>
            {label && (<label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>)}
            <input type={type} id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                 focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props}>
            </input>
        </div>
    )
}

export default React.forwardRef(Input)
