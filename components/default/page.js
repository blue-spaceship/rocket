import Styles from './page.module.scss'

export const Main = ({ children }) => {
    return <main className={ Styles.main }>{ children }</main> 
}

export const Header = ({ children }) => {
    return <header className={ Styles.header }>{ children }</header>
}

export const Content = ({ children }) => {
    return <session className={ Styles.content }>{children}</session>
}

export const Card = ({ children }) => {
    return <section className={ Styles.card }>{ children }</section>
}

export default {
    Header,
    Main,
    Content,
    Card
}