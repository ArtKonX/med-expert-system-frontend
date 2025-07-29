import React from 'react';

type TypeButton = 'button' | 'reset' | 'submit';

interface CustomButtonProps {
    text: string,
    type: TypeButton,
    onAction?: () => void,
    disabled?: boolean
}

const CustomButton = (
    { text, type, onAction, disabled }: CustomButtonProps) => {

    return (
        <button className="max-sm:p-0 max-sm:w-[120px] bg-blue-100 dark:bg-blue-900 dark:text-white
         py-3 px-4 ml-2 font-bold text-[15px]
                rounded-2xl disabled:opacity-65 disabled:cursor-auto
                cursor-pointer hover:opacity-65 duration-500
                transition-opacity h-13 border-1"
            type={type} onClick={onAction && onAction}
            disabled={disabled !== undefined ? disabled : false}>{text}</button>
    )
}

export default CustomButton