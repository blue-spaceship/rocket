import React, { useEffect, useState } from "react"
import Styles from './notify.module.scss'

function LoadingItem({visible}){
    const [visibleState, setVisibleState] = useState(visible)

    useEffect(() => {
        if(visible !== visibleState){
            setVisibleState(visible)
        }
    }, [visible])
    
    return  visibleState ? <div className={ Styles.loading }><span className="material-icons-round">loop</span></div> : null
}

export default LoadingItem