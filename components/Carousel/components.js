import styled from "styled-components";
import {motion} from "framer-motion";
import {urlFor} from "../../lib/client";

export const NEXT = "NEXT";
export const PREV = "PREV";

export const Item = styled.div`
  text-align: center;
  padding: 100px;
  background-image: ${props => `url(${props.img})`};
  background-size: cover;
`;


export const CarouselContainer = styled.div`
  display: flex;
  transition: ${props => (props.sliding ? "none" : "transform 1s ease")};
  transform: ${props => {
    if (!props.sliding) return "translateX(calc(-95% ))";
    return "translateX(0%)";
}};
`;

export const Wrapper = styled.div`
  border-top: 3px solid #191D04;
  border-bottom: 3px solid #191D04;
  margin-bottom: 50px;
  border-radius: 0;
  padding: 5em 1em;
  width: 100%;
  overflow: hidden !important;
  overflow-x: hidden !important;
  box-shadow: 5px 5px 20px 7px rgba(25, 29, 4, 0);
  
`;


export const CarouselSlot = styled.div`
border-radius: 30px;
  flex: 1 0 100%;
  flex-basis: 100%;
  
  order: ${props => props.order};
  box-shadow: 5px 5px 20px 7px rgba(25, 29, 4, 0.05);
`;

export const SlideButton = styled.button`
color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  background-color: #F08700;
  border-radius: 15px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
  border: none;
  float: ${props => props.float};
`;

export const AppContainer = styled.div`
  font-family: sans-serif;
  text-align: center;
  width: 75%;
`;

export const ExtraInfo = styled.div`
  margin-top: 25px;
  display: inline-block;
`;

export const Code = styled.code`
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  margin: 0;
  padding: 0.2em 0.4em;
`;
