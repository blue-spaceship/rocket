import Styles from './tag.module.scss'

export const Tag = ( props ) => {
    return <div className={ Styles.tag } { ...props }>{ props.children }</div>
}
