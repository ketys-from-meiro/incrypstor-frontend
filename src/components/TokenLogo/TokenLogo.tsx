import React from "react"
import classnames from "classnames"
import styles from "./TokenLogo.module.scss"
import wbtc from "./logos/wbtc.png"
import weth from "./logos/weth.png"
import uni from "./logos/uni.png"
import link from "./logos/link.png"

const addressToLogo = {
    "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6": weth,
    "0xc04b0d3107736c32e19f1c62b2af67be61d63a05": wbtc,
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984": uni,
    "0x326c977e6efc84e512bb9c30f76e30c160ed06fb": link,
}

type TokenLogoProps = {
    address: string
    size?: "sm" | "md" | "lg"
    className?: string
}

function TokenLogo({ address, size = "md", className }: TokenLogoProps) {
    return (
        <img
            className={classnames(styles.tokenLogo, styles[size], className)}
            alt=""
            src={addressToLogo[address.toLowerCase() as keyof typeof addressToLogo]}
        />
    )
}

export default TokenLogo
