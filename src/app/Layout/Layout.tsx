import useAuth from "app/Auth/useAuth"
import Button from "components/Button/Button"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "./Layout.module.scss"
import { shortenAddress } from "./layoutUtils"

const Layout = function () {
    const auth = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.navContent}>
                    <h1>InCrypstor</h1>
                    <div className={styles.tabs}>
                        <button className={styles.active} onClick={() => navigate("/")}>
                            Your strategies
                        </button>
                    </div>
                    <div className={styles.account}>
                        Account: {shortenAddress(auth.address)}
                        <Button
                            color="secondary"
                            size="sm"
                            className={styles.logoutBtn}
                            onClick={() => auth.disconnect()}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout
