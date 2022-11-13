import useAuth from "app/Auth/useAuth"
import Button from "components/basic/Button/Button"
import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./Login.module.scss"

function Login() {
    const auth = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        if (auth.address) {
            navigate(from, { replace: true })
        }
    }, [auth.address, navigate, from])

    return (
        <section className={styles.login}>
            <div className={styles.content}>
                <div>
                    <h1>InCrypstor</h1>
                    <p>Makes crypto investments simple.</p>
                    <Button onClick={() => auth.connect()}>Connect wallet</Button>
                </div>
            </div>
            <div className={styles.bg}></div>
        </section>
    )
}

export default Login
