import React from "react"
import classnames from "classnames"
import styles from "./Card.module.scss"

type CardProps = {
    children: React.ReactNode
    className?: string
}

function Card({ children, className }: CardProps) {
    return <div className={classnames(styles.card, className)}>{children}</div>
}

export default Card
