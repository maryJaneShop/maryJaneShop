import React, {useState} from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai';
import Marquee from "react-fast-marquee";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "react-slick";
import {client, urlFor} from '../../lib/client';
import {Product} from '../../components';
import {useStateContext} from '../../context/StateContext';
import Link from "next/link";
import {motion} from "framer-motion";
import { useSwipeable } from 'react-swipeable';
import Carousel, {CarouselItem} from "../../components/Carousel";

import Carousel2, {Item} from "../../components/Carousel/Carousel2";
import Loader from "../../components/Loader";


const ProductDetails = ({product, products}) => {
    const {image, name, details, price, unity} = product;
    const [index, setIndex] = useState(0);
    const {decQty, incQty, qty, onAdd, setShowCart, setQty, totalQuantities} = useStateContext();

    const handleDragStart = (e) => e.preventDefault();

/*    const itemsCarousel = products.map((item) => (
        <Product key={item._id} product={item} handleDragStart={handleDragStart}/>
    ))
    const renderSlides = () =>
        [1, 2, 3, 4, 5, 6, 7, 8].map(num => (
            <div>
                <h3>Slide {num}</h3>
            </div>
        ));*/
    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }
    return (
        <>

            <div className="product-detail-container">
                <div className="images-wrapper">

                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>

                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Detalles: </h4>
                    <p>{details}</p>

                    <div className="quantity">
                        {/*<h3>Quantity:</h3>*/}
                        <p className="price">${price} (MXN)</p>
                        {/*<span className="num">{qty}</span>*/}
                        <span className="unity">/ ({unity})</span>
                        {/*<p className="quantity-desc">
                            <span className="plus" onClick={incQty}><AiOutlinePlus/></span>
                            <span className="minus" onClick={decQty}><AiOutlineMinus/></span>
                        </p>*/}
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
                            Añadir al Carrito
                        </button>
                        <button type="button" className="buy-now"
                                onClick={() => setShowCart(true)} >
                            Abrir carrito
                        </button>
                    </div>
                </div>
            </div>
           {/* <div>
            <Slider
                dots={false}
                slidesToShow={2}
                slidesToScroll={2}
                autoplay={true}
                autoplaySpeed={3000}
            >
                {renderSlides()}
            </Slider>
            </div>*/}

            <div className="maylike-products-wrapper">
                <h2>También te puede gustar</h2>
             {/* <Carousel>
                      {products.map((item) => (
                          <CarouselItem products={products} item={item} />
                      ))}
              </Carousel>*/}
                <Carousel2 title="Carousel">
                    {products.map((item) => (
                        /*<Product key={item._id} product={item} handleDragStart={handleDragStart}/>*/
                        <motion.div whileInView={{ scale: 0.99}}>
                            <Link href={`/product/${item.slug.current}`}>
                                <motion.div initial="hidden" animate="visible" className="product-card-carousel">
                                    <motion.img
                                        handleDragStart={handleDragStart}
                                        variants={item}
                                        src={urlFor(item.image && item.image[0])}
                                        className="product-image"
                                    />
                                    <motion.p  variants={item} className="product-name-carousel">{item.name}</motion.p>
                                    <motion.p  variants={item} className="product-details-carousel">{item.details}</motion.p>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </Carousel2>


            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    /*console.log(product);*/

    return {
        props: {products, product}
    }
}

export default ProductDetails
