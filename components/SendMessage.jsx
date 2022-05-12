import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import CustomButton from "./CustomButton";


const SendMessage = ({cartItems, onClick}) => {


    return (
        <div className="whatsapp">
           {/* {cartItems.length >= 1 && cartItems.map((item, index) =>
                <p>
                    {item.name} x {item.quantity}
                </p>
            )}*/}
            <CustomButton
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                onClick={onClick}
                label={"¿Has terminado?" + "\n" + "Ver vista previa del chat"}
            />

        </div>
    );
};

export default SendMessage;
