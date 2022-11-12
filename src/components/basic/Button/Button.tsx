import React from "react"
import classnames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    className?: string
    color?: "primary" | "secondary"
}

function Button({ children, className, color, ...rest }: ButtonProps) {
    return (
        <button
            className={classnames(styles.button, className, styles[color ?? "primary"])}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
