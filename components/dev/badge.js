import { useEffect } from 'react'
import Head from 'next/head'

export const Badge = () => {
    const noProduction = ( process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') || ( process.env.NODE_ENV && process.env.NODE_ENV !== 'production')
    
    useEffect(() => {
        if(noProduction){
            document.body.className = 'noproduction';
        }
    }, [noProduction])

    return noProduction ? (<>
        <Head>
            <link rel="manifest" href="/dev/manifest.json" />
            <link rel="icon" href="/dev/assets/icons/icon-192x192.png" />
            <link rel="apple-touch-icon" href="/dev/assets/icons/icon-192x192.png" />
            <link rel="icon" sizes="256x256" href="/dev/assets/icons/icon-256x256.png" />
            <link rel="apple-touch-icon" sizes="256x256" href="/dev/assets/icons/icon-256x256.png" />
            <link rel="icon" sizes="384x384" href="/dev/assets/icons/icon-384x384.png" />
            <link rel="apple-touch-icon" sizes="384x384" href="/dev/assets/icons/icon-384x384.png" />
            <link rel="icon" sizes="512x512" href="/dev/assets/icons/icon-512x512.png" />
            <link rel="apple-touch-icon" sizes="512x512" href="/dev/assets/icons/icon-512x512.png" />
            <meta name="theme-color" content="#08BDBD" />
            <meta name="msapplication-navbutton-color" content="#08BDBD" />
        </Head>

        <style jsx global>                
            {
                `body.noproduction{
                    --color-main-one: #FF0077;                    
                    --color-main-one-dark: #cf0061;
                    --color-main-two: #F76BEE;
                    --color-main-two-dark: #cf43c6;
                }`
            }
        </style>
    </>) : null
}

export default Badge