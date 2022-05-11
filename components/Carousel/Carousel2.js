import React, {useEffect, useState} from "react";
import { useSwipeable } from "react-swipeable";
import {
    Wrapper,
    CarouselContainer,
    CarouselSlot,
    SlideButton,
    PREV,
    NEXT
} from "./components";
import {motion} from "framer-motion";
import {urlFor} from "../../lib/client";

const getOrder = ({ index, pos, numItems }) => {
    return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};
const initialState = { pos: 0, sliding: false, dir: NEXT };

export const Item = ({ children, products, item }) => {
    return (
        <div className="carousel-item" >
            <motion.div  initial="hidden" animate="visible" className="product-card-carousel">
                <motion.img
                    variants={item}
                    src={urlFor(item.image && item.image[0])}
                    className="product-image"
                />
                <motion.p  variants={item} className="product-name">{item.name}</motion.p>
                <motion.p  variants={item} className="product-details">{item.details}</motion.p>
            </motion.div>
        </div>
    );
};

const Carousel2 = props => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const numItems = React.Children.count(props.children);
    const slide = dir => {
        dispatch({ type: dir, numItems });
        setTimeout(() => {
            dispatch({ type: "stopSliding" });
        }, 50);
    };
/*    const handlers = useSwipeable({
        onSwipedLeft: () => slide(NEXT),
        onSwipedRight: () => slide(PREV),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });*/
    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(props.children) - 1;
        } else if (newIndex >= React.Children.count(props.children)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused) {
                updateIndex(activeIndex + 1);
            }
        }, 3000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });
    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div {...handlers}

        >
            <Wrapper>
                <CarouselContainer
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    dir={state.dir} sliding={state.sliding}  style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {React.Children.map(props.children, (child, index) => (
                        <CarouselSlot
                            key={index}
                            order={getOrder({ index: index, pos: state.pos, numItems })}
                        >
                            {child}
                        </CarouselSlot>
                    ))}
                </CarouselContainer>
               {/* <SlideButton onClick={() => slide(PREV)} float="left">
                    Prev
                </SlideButton>
                <SlideButton onClick={() => slide(NEXT)} float="right">
                    Next
                </SlideButton>*/}
                <div className="indicators">
                    <button
                        onClick={() => {
                            updateIndex(activeIndex - 1);
                        }}
                    >
                        Prev
                    </button>
                    {React.Children.map(props.children, (child, index) => {
                        return (
                            <button
                                className={`${index === activeIndex ? "active" : ""}`}
                                onClick={() => {
                                    updateIndex(index);
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => {
                            updateIndex(activeIndex + 1);
                        }}
                    >
                        Next
                    </button>
                </div>
            </Wrapper>

        </div>
    );
};

function reducer(state, { type, numItems }) {
    switch (type) {
        case "reset":
            return initialState;
        case PREV:
            return {
                ...state,
                dir: PREV,
                sliding: true,
                pos: state.pos === 0 ? numItems - 1 : state.pos - 1
            };
        case NEXT:
            return {
                ...state,
                dir: NEXT,
                sliding: true,
                pos: state.pos === numItems - 1 ? 0 : state.pos + 1
            };
        case "stopSliding":
            return { ...state, sliding: false };
        default:
            return state;
    }
}

export default Carousel2;
