import React from "react"
import classnames from "classnames"
import styles from "./Card.module.scss"

type CardProps = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

function Card({ children, className, ...rest }: CardProps) {
    return (
        <div className={classnames(styles.card, className)} {...rest}>
            {children}
        </div>
    )
}

export default Card
