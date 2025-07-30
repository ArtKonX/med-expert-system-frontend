'use client'

import React from 'react';

import Link from "next/link"

interface CustomLinkProps {
    href: string,
    text: string
}

const CustomLink = (
    { href, text }: CustomLinkProps) => {

    return (
        <Link href={href} className="max-sm:p-2 max-sm:w-[120px] bg-blue-100 dark:bg-blue-900 dark:text-white
         py-3 px-4 font-bold text-[15px]
                rounded-2xl
                cursor-pointer hover:opacity-65 duration-500
                transition-opacity h-13 border-1" >{text}</Link>
    )
}

export default CustomLink