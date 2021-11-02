import Styles from './input.module.scss'

export const Input = ( { label, labelComplement = <></>, input, message } ) => {
    return (
        <label className={ Styles.inputField }>
            <div className={ Styles.inputHeader }>                
                <span className={ Styles.inputLabel }>{ label }</span>
                { labelComplement }
            </div>
            <input className={ Styles.input } {...input}/>
            { message && <p className={ `${Styles.message} ${Styles[ message.type || 'default' ]}` }>{ message.text }</p> }
        </label>
    )
}

export const TextArea = ( { label, labelComplement = <></>, input, message } ) => {
    return (
        <label className={ Styles.inputField }>
            <div className={ Styles.inputHeader }>
                <span className={ Styles.inputLabel }>{ label }</span>
                { labelComplement }
            </div>
            <textarea {...input} className={ Styles.textarea } rows={4} />
            { message && <p className={ `${Styles.message} ${Styles[ message.type || 'default' ]}` }>{ message.text }</p> }
        </label>
    )
}

export const Select = ( { label, labelComplement = <></>, input, message, options } ) => {
    return (
        <label className={ Styles.inputField }>
            <div className={ Styles.inputHeader }>
                <span className={ Styles.inputLabel }>{ label }</span>
                { labelComplement }
            </div>
            <select {...input} className={ Styles.select }>
                { options && options.map( ( option, index ) => (
                    <option key={ index } value={ option.value } >{ option.text }</option>
                ) ) }
            </select>
            { message && <p className={ `${Styles.message} ${Styles[ message.type || 'default' ]}` }>{ message.text }</p> }
        </label>
    )
}

export const Checkbox = ( { label, labelComplement = <></>, input, message } ) => {
    return (
        <label className={ Styles.inputField } style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <div style={{ height: '1.5rem', display: 'flex', alignItems: 'center' }}>
                <input className={ Styles.checkbox } type="checkbox" {...input} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <div className={ Styles.inputHeader }>
                    <span className={ Styles.inputLabel }>{ label }</span>
                    { labelComplement }
                </div>
                { message && <p className={ `${Styles.message} ${Styles[ message.type || 'default' ]}` }>{ message.text }</p> }
            </div>
        </label>
    )
}

export const CheckButton = ( { label, labelComplement = <></>, input, message, customToogle = [ 'Sim', 'Não' ] } ) => {
    return (
        <label className={ Styles.inputField } style={{ flexDirection: 'row', alignContent: 'space-between' }}>
            <input className={ Styles.hidden } type="checkbox" {...input} />

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', flex: 1 }}>
                <div className={ Styles.inputHeader }>
                    <span className={ Styles.inputLabel }>{ label }</span>
                    { labelComplement }
                </div>
                { message && <p className={ `${Styles.message} ${Styles[ message.type || 'default' ]}` }>{ message.text }</p> }
            </div>

            <div className={ `${ Styles.checkbutton } ${ input?.checked ? Styles.active : '' }` }>
                { input?.checked ? customToogle[0] : customToogle[1] }
            </div>
        </label>
    )
}

export const TextBox = ( { children } ) => {
    return (
        <div className={ Styles.textbox }>
            { children }
        </div>
    )
}