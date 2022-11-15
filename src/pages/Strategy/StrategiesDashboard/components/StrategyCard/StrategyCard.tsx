import React from "react"
import classnames from "classnames"
import styles from "./StrategyCard.module.scss"
import Card from "components/Card/Card"
import TokenLogo from "components/TokenLogo/TokenLogo"
import Button from "components/Button/Button"

export type StrategyCardProps = {
    className?: string
    name: string
    value?: number
    earnings?: number
    tokensAddresses: string[]
    loadingValue: boolean
    valueError?: string
    loadingEarnings: boolean
    earningsError?: string
}

function StrategyCard({
    className,
    name,
    value,
    earnings,
    tokensAddresses,
    loadingValue,
    loadingEarnings,
    valueError,
    earningsError,
}: StrategyCardProps) {
    return (
        <Card className={classnames(styles.strategyCard, className)}>
            <h2>{name}</h2>
            <div className={styles.values}>
                <div className={styles.valueContainer}>
                    <label>Value</label>
                    <span>{value}$</span>
                </div>
                <div className={styles.valueContainer}>
                    <label>Earnings</label>
                    <span
                        className={classnames({
                            [styles.red]: earnings && earnings < 0,
                            [styles.green]: earnings && earnings > 0,
                        })}
                    >
                        {earnings}$
                    </span>
                </div>
            </div>
            <div className={styles.tokensLogos}>
                {tokensAddresses.map(address => (
                    <TokenLogo key={address} address={address} size="sm" />
                ))}
            </div>
            <div className={styles.actionButtons}>
                <Button color="primary">Invest</Button>
                <Button color="secondary">View detail&nbsp;&rsaquo;</Button>
            </div>
        </Card>
    )
}

export default StrategyCard
