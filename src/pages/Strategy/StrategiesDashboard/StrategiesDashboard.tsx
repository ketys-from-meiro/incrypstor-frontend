import React from "react"
import CreateNewStrategyCard from "./components/CreateNewStrategyCard/CreateNewStrategyCard"
import StrategyCard, { StrategyCardProps } from "./components/StrategyCard/StrategyCard"
import styles from "./StrategiesDashboard.module.scss"

const userStrategies: (StrategyCardProps & { id: string })[] = [
    {
        id: "1",
        name: "All in BTC & ETH",
        value: 1543.44,
        earnings: 25.32,
        tokensAddresses: [
            "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
            "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05",
        ],
        loadingValue: false,
        loadingEarnings: false,
    },
    {
        id: "2",
        name: "All BTC",
        value: 320.44,
        earnings: -12.09,
        tokensAddresses: ["0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05"],
        loadingValue: false,
        loadingEarnings: false,
    },
]

function StrategiesDashboard() {
    return (
        <div className={styles.strategiesDashboard}>
            {userStrategies.map(strategy => (
                <StrategyCard key={strategy.id} {...strategy} />
            ))}
            <CreateNewStrategyCard />
        </div>
    )
}

export default StrategiesDashboard
