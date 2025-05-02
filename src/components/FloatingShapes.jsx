import React from 'react'
import { motion as Motion } from "motion/react"
function FloatingShapes({backgroundColor, size, top, left, delay}) {
  return (
    <Motion.div
    className={`absolute rounded-full ${backgroundColor} ${size} opacity-20 blur-xl`}
    style={{top, left}}
    animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
    }}

    transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
        delay
    }}
    aria-hidden='true'
    />
  )
}

export default FloatingShapes