import 'antd/dist/antd.css';

import '../styles/diolog.css';
import '../styles/globals.css';
import '../styles/table.css';
import type { AppProps } from 'next/app';
import { Console } from 'console';

// interface theme {
//     theme: string,
// }

export default function ({ Component, pageProps }: AppProps) {
    
    return (

        <Component {...pageProps} />
    )
}