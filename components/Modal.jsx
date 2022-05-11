import React from "react";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import {AiOutlineClose, AiOutlineLeft, AiOutlineWhatsApp} from "react-icons/ai";
import CustomButton from "./CustomButton";



const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};


const Modal = ({ handleClose, cartItems, userName }) => {
    const order = (cartItems.length >= 1 && cartItems.map((item, index) => (item.name) + " (" + (item.quantity)
        +" g)"))

    function SendMessage() {
        let name = userName
        let url = "https://api.whatsapp.com/send?phone=522462224323&text=¡Hola amigos de MJ SHOP!"
            + " me gustaría hacer el siguiente pedido: " + order ;
        window.open(url);
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button type="button"
                        className="cart-heading" onClick={handleClose}>
                    <AiOutlineClose/>
                </button>
                <div className="order-wrapper">
                <div className="order">
                    <p>
                        ¡Hola amigos de MaryJane SHOP! me gustaría hacer el siguiente pedido:
                    </p>
                <p>{order.join(", ")}</p>
                </div>
                <div className="order-bottom">
                    <CustomButton
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onClick={SendMessage}
                        label="Continuar al Chat"
                    />
                    {"\n"}
                    <AiOutlineWhatsApp />
                </div>
                </div>
            </motion.div>
        </Backdrop>
    );
};


export default Modal;
