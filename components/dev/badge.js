import { useEffect, useState } from 'react'
import Head from 'next/head'

export const Badge = () => {
    let noProduction = true 

    if(process.env.NEXT_PUBLIC_VERCEL_ENV){
        noProduction = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production'
    }else{
        if(process.env.NODE_ENV){
            noProduction = process.env.NODE_ENV !== 'production'
        }
    }
    
    useEffect(() => {
        if(noProduction){
            document.body.className = 'noproduction';
        }
    }, [noProduction])

    return noProduction ? (<>
        <Head>
            <link rel="manifest" href="/manifest-dev.json" />
            <link rel="icon" href="/dev/assets/icons/icon-192x192.png" />
            <link rel="apple-touch-icon" href="/dev/assets/icons/icon-192x192.png" />
            <link rel="icon" sizes="256x256" href="/dev/assets/icons/icon-256x256.png" />
            <link rel="apple-touch-icon" sizes="256x256" href="/dev/assets/icons/icon-256x256.png" />
            <link rel="icon" sizes="384x384" href="/dev/assets/icons/icon-384x384.png" />
            <link rel="apple-touch-icon" sizes="384x384" href="/dev/assets/icons/icon-384x384.png" />
            <link rel="icon" sizes="512x512" href="/dev/assets/icons/icon-512x512.png" />
            <link rel="apple-touch-icon" sizes="512x512" href="/dev/assets/icons/icon-512x512.png" />
            <meta name="theme-color" content="#5267de" />
            <meta name="msapplication-navbutton-color" content="#5267de" />
        </Head>

        <style jsx global>                
            {
                `body.noproduction{
                    --color-main-one: #5267de;
                    --color-main-one-dark: #31419e;
                    --color-main-two: #c9518f;
                    --color-main-two-dark: #8f285d;
                }`
            }
        </style>
    </>) : null
}

export default Badge