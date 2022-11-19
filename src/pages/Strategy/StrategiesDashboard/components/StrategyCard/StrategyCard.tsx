import React from "react"
import classnames from "classnames"
import styles from "./StrategyCard.module.scss"
import Card from "components/Card/Card"
import TokenLogo from "components/TokenLogo/TokenLogo"
import Button from "components/Button/Button"
import { TokenParams } from "pages/Strategy/strategyTypes"

export type StrategyCardProps = {
    className?: string
    name: string
    value?: number
    earnings?: number
    tokensParams: readonly TokenParams[]
    loadingValue: boolean
    valueError?: string
    loadingEarnings: boolean
    earningsError?: string
    onInvestClick: () => void
}

function StrategyCard({
    className,
    name,
    value,
    earnings,
    tokensParams,
    loadingValue,
    loadingEarnings,
    valueError,
    earningsError,
    onInvestClick,
}: StrategyCardProps) {
    return (
        <Card className={classnames(styles.strategyCard, className)}>
            <h2>{name}</h2>
            <div className={styles.values}>
                <div className={styles.valueContainer}>
                    <label>Value</label>
                    <span>{value} ETH</span>
                </div>
                <div className={styles.valueContainer}>
                    <label className={styles.earningsLabel}>Earnings</label>
                    <span
                        className={classnames({
                            [styles.red]: earnings && earnings < 0,
                            [styles.green]: earnings && earnings > 0,
                        })}
                    >
                        {earnings} ETH
                    </span>
                </div>
            </div>
            <div className={styles.tokensLogos}>
                {tokensParams.map(tokenParam => (
                    <TokenLogo key={tokenParam.addr} address={tokenParam.addr} size="sm" />
                ))}
            </div>
            <div className={styles.actionButtons}>
                <Button color="primary" onClick={onInvestClick}>
                    Invest
                </Button>
                <Button color="secondary">View detail&nbsp;&rsaquo;</Button>
            </div>
        </Card>
    )
}

export default StrategyCard
