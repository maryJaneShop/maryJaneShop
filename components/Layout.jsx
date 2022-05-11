import React from 'react';
import Head from 'next/head';

import Footer from './Footer';
import {NavBar} from "./index";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Head>
                <title>MaryJane || Shop</title>
            </Head>
            <header>
                <NavBar />
            </header>
            <main className="main-container">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout
