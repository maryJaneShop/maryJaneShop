import React, {useState} from "react";
import {Toaster} from "react-hot-toast";
import '../styles/globals.css'
import {Layout} from "../components";
import {StateContext, useStateContext} from "../context/StateContext";
import {Router} from "next/router";
import Loader from "../components/Loader";


function MyApp({Component, pageProps}) {

    const [loading, setLoading] = useState(false);

    Router.events.on("routeChangeStart", (url) => {
        /*console.log("Route is changing...")*/
        setLoading(true);
        console.log(loading)

    })
    Router.events.on("routeChangeComplete", (url) => {
        /*console.log("Route is complete changed!")*/
        setLoading(false);
        console.log(loading)
    })

    return (
        <>
            {loading && <Loader />}
        <StateContext>
            <Layout>
                <Toaster/>
                <Component {...pageProps} />
            </Layout>
        </StateContext>
        </>
    )
}

export default MyApp
