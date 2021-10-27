import Styles from './page.module.scss'

export const Main = ({ children }) => {
    return <main className={ Styles.main }>{ children }</main> 
}

export const Header = ({ children }) => {
    return <header className={ Styles.header }>{ children }</header>
}

export const Content = ({ children }) => {
    return <section className={ Styles.content }>{children}</section>
}

export const Card = ({ children, closeAction = ()=>{} }) => {
    return <div className={ Styles.overlayer }>
        <div className={ Styles.empty } onClick={ closeAction }></div>
        <section className={ Styles.card }>{ children }</section>
    </div>
}

export default {
    Header,
    Main,
    Content,
    Card
}