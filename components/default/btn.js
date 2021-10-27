import Link from 'next/link'
import Styles from './btn.module.scss'

export const Btn = ( props ) => {
    if( props.href ) {
        return <Link href={props.href} >
            <a className={ Styles.button } { ...props }>{ props.children }</a>
        </Link>
    }
    return <button type="button" className={ Styles.button } { ...props }>{ props.children }</button>
}

export const BtnIcon = ( props ) => {
    if( props.href ) {
        return <Link href={props.href} >
            <a className={ Styles.buttonIcon } { ...props }>{ props.children }</a>
        </Link>
    }
    return <button type="button" className={ Styles.buttonIcon } { ...props }>{ props.children }</button>
}