import React, { useCallback, useEffect } from "react"
import styles from "./Modal.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

type ModalProps = {
    isOpen: boolean
    title: string
    children: React.ReactNode
    onClose: () => void
}

function Modal({ isOpen, title, children, onClose }: ModalProps) {
    const handleKeyUp = useCallback(
        (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                evt.preventDefault()
                onClose()
            }
        },
        [onClose],
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keyup", handleKeyUp, false)
        }
        return function cleanup() {
            window.removeEventListener("keyup", handleKeyUp, false)
        }
    }, [isOpen, handleKeyUp])

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <header>
                    <h3>{title}</h3>
                    <button className={styles.closeButton} onClick={() => onClose()}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </header>
                <section className={styles.body}>{children}</section>
            </div>
            <div
                className={styles.modalOverlay}
                onClick={() => {
                    if (isOpen) {
                        onClose()
                    }
                }}
            />
        </div>
    )
}

export default Modal
