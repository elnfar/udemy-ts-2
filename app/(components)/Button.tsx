'use client';

interface ButtonProps {
    label?:string;
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
    outline?:boolean
    small?:boolean
    type?:any
    disabled?:boolean;
}


export default function Button({label,onClick, type, outline, small,disabled}:ButtonProps) {
  return (
    <button onClick={onClick} type={type} disabled={disabled}
    
    className={`relative rounded-lg hover:opacity-80 transition disabled:cursor-not-allowed ${outline ? 'bg-white' : 'bg-purple-500 w-full'} ${outline ? 'text-black' : 'text-white'} ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm' : 'text-lg'} ${small ? ' border-[1px]' : 'border-2'}`}
    >
        {label}
    </button>
  )
}
