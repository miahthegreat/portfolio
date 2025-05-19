'use client'

import React, { useRef, useState, useEffect } from 'react'
import { FaNodeJs, FaPython, FaReact } from 'react-icons/fa'
import { PiMicrosoftExcelLogo, PiMicrosoftPowerpointLogo } from 'react-icons/pi'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import { SiShadcnui, SiTableau } from 'react-icons/si'
import { TbFileTypeSql } from 'react-icons/tb'

const ICONS = [
  { id: 'excel',    Icon: PiMicrosoftExcelLogo,     className: 'h-8 w-8 text-green-500' },
  { id: 'ppt',      Icon: PiMicrosoftPowerpointLogo, className: 'h-8 w-8 text-red-500' },
  { id: 'tableau',  Icon: SiTableau,                 className: 'h-8 w-8 p-1 text-indigo-500 dark:text-indigo-100' },
  { id: 'sql',      Icon: TbFileTypeSql,             className: 'h-8 w-8 text-lime-500 dark:text-lime-200' },
  { id: 'python',   Icon: FaPython,                  className: 'h-8 w-8 text-purple-600 dark:text-yellow-300' },
  { id: 'node',     Icon: FaNodeJs,                  className: 'h-8 w-8 text-emerald-500 dark:text-emerald-300' },
  { id: 'react',    Icon: FaReact,                   className: 'h-8 w-8 text-blue-400 dark:text-blue-200' },
  { id: 'nextjs',   Icon: RiNextjsFill,              className: 'h-8 w-8 text-gray-700 dark:text-gray-50' },
  { id: 'tailwind', Icon: RiTailwindCssFill,         className: 'h-8 w-8 text-cyan-500 dark:text-cyan-300' },
  { id: 'shadcn',   Icon: SiShadcnui,                className: 'h-8 w-8 p-1 text-gray-500 dark:text-gray-100' },
]

export default function LogoGroup() {
  const singleRef = useRef<HTMLDivElement>(null)
  const [marqueeWidth, setMarqueeWidth] = useState(0)

  useEffect(() => {
    if (!singleRef.current) return
    // measure on mount + whenever its size changes
    const ro = new ResizeObserver(() => {
      // offsetWidth includes the gap since we're using inline-block + space-x-8
      setMarqueeWidth(singleRef.current!.offsetWidth+32)
    })
    ro.observe(singleRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <div
        className="inline-flex animate-[marquee_15s_linear_infinite] md:animate-none space-x-8"
        style={{ '--marquee-width': `${marqueeWidth}px` } as React.CSSProperties}
      >
        {/* first copy, measured */}
        <div ref={singleRef} className="inline-flex space-x-8">
          {ICONS.map(({id, Icon, className}, idx) => (
            <span
              key={`${id}-${idx}`}
              className="inline-block bg-muted p-1 rounded-full"
            >
              <Icon className={className} />
            </span>
          ))}
        </div>
        {/* second copy */}
        <div className="md:hidden inline-flex space-x-8  md:animate-none ">
          {ICONS.map(({id, Icon, className}, idx) => (
            <span
              key={`${id}-${idx}-dup`}
              className="inline-block bg-muted p-1 rounded-full"
            >
              <Icon className={className} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
