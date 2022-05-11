import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import SvgIcon from "./SvgIcon";

const Footer = () => {
    return (
        <div className="footer-container">
            <p>2022 MaryJane Shop<br/> <br/>Todos los derechos reservados</p>
            <p className="icons">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
           {/* <SvgIcon />*/}
        </div>
    )
}

export default Footer
