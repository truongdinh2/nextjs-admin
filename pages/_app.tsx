import 'antd/dist/antd.css';
import React from 'react';
import '../styles/diolog.css';
import '../styles/globals.css';
import '../styles/table.css';
import type { AppProps } from 'next/app';
export default function ({ Component, pageProps }: AppProps) {
    
    return (

        <Component {...pageProps} />
    )
}