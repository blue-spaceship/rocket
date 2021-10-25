import Styles from './page.module.scss'

export const Main = ({ children }) => {
    return <main className={ Styles.main }>{ children }</main> 
}

export const Header = ({ children }) => {
    return <header className={ Styles.header }>{ children }</header>
}

export const Contant = ({ children }) => {
    return <session className={ Styles.contant }>{children}</session>
}

export default {
    Header,
    Main,
    Contant
}