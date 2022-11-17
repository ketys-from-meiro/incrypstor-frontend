import React from "react"
import classnames from "classnames"
import styles from "./LoadingIndicator.module.scss"

function LoadingIndicator({ className }: { className?: string }) {
    return <div className={classnames(styles.loadingIndicator, className)} />
}

export default LoadingIndicator
