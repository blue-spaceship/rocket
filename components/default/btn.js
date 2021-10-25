import Styles from './btn.module.scss'

export const Btn = ( props ) => {
    return <button type="button" className={ Styles.button } { ...props }>{ props.children }</button>
}

export const BtnIcon = ( props ) => {
    return <button type="button" className={ Styles.buttonIcon } { ...props }>{ props.children }</button>
}