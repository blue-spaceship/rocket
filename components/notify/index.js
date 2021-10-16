import React, { useEffect, useRef, useState } from "react"
import Styles from './notify.module.scss'

export const Types = {
    Default: 'default',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
}

const TIME_DEFAULT = 5 * 1000

function NotifyItem({type, title, children}, prop){
    const ref = useRef(null)
    const [ TIMEOUT, SETTIMEOUT ] = useState( 0 )

    const OnClickHandle = (event) => {
        clearTimeout(TIMEOUT)
        removeItem()
    }

    const removeItem = () =>{
        if(ref.current){
            ref.current.classList.add( Styles.closing )
            setTimeout(()=>{ ref.current.remove() }, 1000)
        }
    }

    useEffect(()=>{
        const TO = setTimeout( removeItem, TIME_DEFAULT)

        SETTIMEOUT(TO)
    }, [])
    
    return (
        <div className={ `${Styles.notify} ${ Styles[type] }` } onClick={ OnClickHandle } ref={ ref } >
            { title && <div className={ Styles.notifyBar }><div className={ Styles.notifyTitle }>{ title }</div></div> }
            { children && <div className={ Styles.notifyDescription }>{ children }</div> }
        </div>
    )
}

export const Notify = () => {
    const [line, setLine] = useState([])

    const handleMessage = (event) => {
        if(event.data.messaging && event.data.message){
            const elm = <NotifyItem key={`notify-${ (new Date().getTime()) }`} title="Notificação" type={ event.data.type }>{event.data.message}</NotifyItem>
            line.push(elm)
            setLine([...line])
        }
    }

    const renderToasts = () => {
        if(line){
            return line.map( item => ( item ) )
        }else{
            return <></>
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage, false)
    }, [])

    return <section className={ Styles.manager }>{ renderToasts() }</section>
}

export default Notify