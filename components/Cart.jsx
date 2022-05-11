import React, {useRef, useState} from 'react';
import Link from 'next/link';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast from 'react-hot-toast';

import {useStateContext} from '../context/StateContext';
import {urlFor} from '../lib/client';
import getStripe from '../lib/getStripe';
import CustomButton from "./CustomButton";
import SendMessage from "./SendMessage";
import {AnimatePresence} from "framer-motion";
import Modal from "./Modal";

const Cart = () => {
    const cartRef = useRef();
    const {
        totalPrice,
        totalQuantities,
        cartItems,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        onAdd
    } = useStateContext();

    const [userName, setUsername] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);

    /*const [msg, setMessage] = useState(cartItems.length >= 1 && cartItems.map((item) => (item.name + " x " + item.quantity))
        + "Thank you!" + totalPrice );*/

    /*  const [qrcode, setQRCode] = useState(false);*/

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),

        });

        if (response.statusCode === 500) return;

        const data = await response.json();

        toast.loading('Redirecting...');

        stripe.redirectToCheckout({sessionId: data.id});
    }

    return (
        <>

        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <AnimatePresence
                    // Disable any initial animations on children that
                    // are present when the component is first rendered
                    initial={false}
                    // Only render one component at a time.
                    // The exiting component will finish its exit
                    // animation before entering component is rendered
                    exitBeforeEnter={true}
                    // Fires when all exiting nodes have completed animating out
                    onExitComplete={() => null}
                >
                    {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} userName={userName} cartItems={cartItems} />}
                </AnimatePresence>
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}>
                    <AiOutlineLeft/>
                    <span className="heading">Tu Carrito</span>
                   {/* <span className="cart-num-items">({totalQuantities} artículos)</span>*/}
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150}/>
                        <h3>Su bolsa de compras está vacía</h3>
                        {/*<button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Continue Shopping
                            </button>*/}
                        <CustomButton label="Continuar Comprando" onClick={() => setShowCart(false)}/>
                    </div>
                )}

                <div className="product-container">


                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image"/>
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div className="quantity">
                                        <p className="quantity-desc-cart">
                    <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                    <AiOutlineMinus/>
                    </span>
                                            <p className="num">{item.quantity}
                                                <span className="unity">(g)</span>
                                            </p>

                                            <span className="plus"
                                                  onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                                                /*onClick={() => onAdd(qty)}*/>
                        <AiOutlinePlus/>
                    </span>
                                        </p>
                                    </div>


                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => onRemove(item)}
                                    >
                                        <TiDeleteOutline size={30}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (

                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            {/* <button type="button" className="btn" onClick={handleCheckout}>
                                Pay with Stripe
                            </button>*/}
                            <SendMessage onClick={() => (modalOpen ? close() : open())} userName={userName}
                                         setUsername={setUsername} cartItems={cartItems}/>
                        </div>
                    </div>

                )}

            </div>


        </div>

    </>
    )
}

export default Cart
