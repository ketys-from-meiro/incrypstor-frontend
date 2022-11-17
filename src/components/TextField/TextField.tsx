import React, { ComponentPropsWithoutRef, forwardRef, Ref } from "react"
import styles from "./TextField.module.scss"
import classnames from "classnames"

type TextFieldProps = {
    label?: string
    error?: string
    sufixText?: string
} & ComponentPropsWithoutRef<"input">

const TextField = forwardRef(
    (
        { label, error, type, className, sufixText, ...props }: TextFieldProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <div className={classnames(styles.textField, { [styles.hasError]: error }, className)}>
                {label && <label htmlFor={props.name}>{label}</label>}
                <div
                    className={classnames(styles.inputWrapper, {
                        [styles.hasSufixText]: Boolean(sufixText),
                    })}
                >
                    <input id={props.name} type={type ?? "text"} ref={ref} {...props} />
                    {sufixText && <div className={styles.sufixText}>{sufixText}</div>}
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        )
    },
)

export default TextField
