import Button from "components/basic/Button/Button"
import React from "react"
import { useConnect } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import styles from "./Login.module.scss"

function Login() {
    const { connect: walletConnect } = useConnect({
        connector: new InjectedConnector(),
    })

    return (
        <section className={styles.login}>
            <div className={styles.leftPart}>
                <h1>InCrypstor</h1>
                <p>Makes crypto investments simple.</p>
                <Button onClick={() => walletConnect()}>Connect wallet</Button>
            </div>
        </section>
    )
}

export default Login
