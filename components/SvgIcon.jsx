import React from 'react';
import {motion} from "framer-motion";

const SvgIcon = () => {
    const icon = {
        hidden: {
            pathLength: 0,
            fill: "rgba(194,210,181,0)"
        },
        visible: {
            pathLength: 2,
            fill: "#C2D2B5"
        }
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="item-svg">
            <motion.path
                variants={icon}
                initial="hidden"
                animate="visible"
                fill="#C2D2B5"
                transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                }}
                fill-opacity="1"
                d="M0,224L48,186.7C96,149,192,75,288,90.7C384,107,480,213,576,240C672,267,768,213,864,165.3C960,117,1056,75,1152,69.3C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
    )
}

export default SvgIcon




