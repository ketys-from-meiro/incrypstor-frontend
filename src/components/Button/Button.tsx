import React from "react"
import classnames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = {
    children: React.ReactNode
    className?: string
    color?: "primary" | "secondary"
    size?: "sm" | "md" | "lg"
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Button({ children, className, color = "primary", size = "md", ...rest }: ButtonProps) {
    return (
        <button
            className={classnames(styles.button, className, styles[color], styles[size])}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
