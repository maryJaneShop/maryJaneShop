import React from 'react';
import Link from 'next/link';
import {urlFor} from '../lib/client';
import CustomButton from "./CustomButton";
import { motion} from "framer-motion";

const HeroBanner = ({heroBanner}) => {

    return (
        <div className="hero-banner-container">
            <div>
                <div className="hero-banner-texts">
                {/*<p className="beats-solo">{heroBanner.smallText}</p>*/}
                <motion.h3 viewport={{ once: true }} whileInView={{y: [-50, 0],opacity: [0, 1]}} transition={{duration: 1.5}}>
                    {heroBanner.smallText}
                </motion.h3>
                <motion.h1 viewport={{ once: true }} whileInView={{x: [-100, 0], opacity: [0, 1]}} transition={{duration: 1.5}}>
                    {heroBanner.largeText1}
                </motion.h1>
                </div>

                <motion.div
                    viewport={{ once: false }}
                    /*whileHover={{ scale: 1.25, rotate: 0 }}
                    whileTap={{
                        scale: 1.25,
                        rotate: 0,
                    }}*/
                    whileInView={{y: [-100, 0], opacity: [0, 1], scale: 1.25, rotate: [90, 0]}}
                    transition={{duration: 1.5}}
                    className="hero-banner-image-container"
                >
                    <img src={urlFor(heroBanner.image)} alt="mj" className="hero-banner-image"/>
                </motion.div>
                <div>
                    <Link href={`/product/${heroBanner.product}`}>
                        {/* <button type="button">{heroBanner.buttonText}</button>*/}
                        <CustomButton label={heroBanner.buttonText}/>
                    </Link>
                    <motion.div whileInView={{opacity: [0, 1]}} transition={{duration: 1.5}} className="desc">
                        <h5>{heroBanner.midText}</h5>
                        <p>{heroBanner.desc}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner
