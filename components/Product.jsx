import React from 'react';
import Link from 'next/link';
import {motion} from "framer-motion";

import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, details } }) => {
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    return (
        <motion.div whileHover={{ scale: 1.1 }}>
            <Link href={`/product/${slug.current}`}>
                <motion.div variants={container} initial="hidden" animate="visible" className="product-card">
                    <motion.img
                        variants={item}
                        src={urlFor(image && image[0])}
                        className="product-image"
                    />
                    <motion.p  variants={item} className="product-name">{name}</motion.p>
                    <motion.p  variants={item} className="product-details">{details}</motion.p>
                </motion.div>
            </Link>
        </motion.div>
    )
}

export default Product
