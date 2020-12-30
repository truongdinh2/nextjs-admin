import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useViewportScroll } from 'framer-motion';
const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
}
export default function Animation() {
    const constraintsRef = useRef(null)
    console.log(constraintsRef.current);
    const x = useMotionValue(0)
    const background = useTransform(
        x,
        [-100, 0, 100],
        ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
    );
    const { scrollYProgress } = useViewportScroll();
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => setIsOn(!isOn);
    return (
        <div >
            <motion.div
                className="ani"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
            >
            </motion.div>
            <motion.div ref={constraintsRef}>
                <motion.div
                    className="ani"
                    drag
                    dragConstraints={constraintsRef}
                />
            </motion.div>
            <motion.div
                whileHover={{ scale: 1.2, rotate: 90 }}
                className="ani"
                whileTap={{
                    scale: 0.5,
                    rotate: -90,
                    borderRadius: "100%"
                }}
            />
            <motion.div
                className="ani"
                animate={{
                    scale: [1, 2, 1, 2, 1],
                    rotate: [270, 0, 270, 270, -90],
                    borderRadius: ['10%', '20%', '30%', '70%', '100%']
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    loop: 2,
                    repeatDelay: 1
                }}
            />
            <motion.div
                className="ani"
                whileTap={{ borderRadius: '100%', scale: 0.7 }}
                whileHover={{ scale: 1.2 }}
                transition={{
                    duration: 0.3
                }}
            />
            <div className="box">
                <motion.div
                    className="ani"
                    drag
                    dragConstraints={{
                        top: -50,
                        left: -50,
                        right: 50,
                        bottom: 50
                    }}
                >
                </motion.div>
            </div>
            <motion.div style={{ background }}>
                <motion.div
                    className="ani"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    style={{ x }}
                />
                <div>x</div>
            </motion.div>
            <motion.path
                className="ani"
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                style={{ pathLength: scrollYProgress }}
            />
            <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
            </div>
        </div>
    )
}
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};