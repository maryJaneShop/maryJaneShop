import React from 'react';
import Link from 'next/link';

import {urlFor} from '../lib/client';
import CustomButton from "./CustomButton";
import {motion, useTransform, useViewportScroll} from "framer-motion";

const FooterBanner = ({
                          footerBanner: {
                              discount,
                              largeText1,
                              largeText2,
                              saleTime,
                              smallText,
                              midText,
                              desc,
                              product,
                              buttonText,
                              image
                          }
                      }) => {
    const {scrollYProgress} = useViewportScroll();
    const scale = useTransform(scrollYProgress, [1, 0], [0.2, 1]);
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3 className="banner-desc-text2">{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        {/* <button type="button">{buttonText}</button>*/}
                        <CustomButton label={buttonText}/>
                    </Link>
                </div>
                <div className="footer-banner-image-container">
                    <img
                        src={urlFor(image)} className="footer-banner-image"
                    />
                </div>

            </div>
        </div>
    )
}

export default FooterBanner
