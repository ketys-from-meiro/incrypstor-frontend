import { CONTRACT_ADDRESS } from "consts"
import React from "react"
import { useContractRead } from "wagmi"
import CreateNewStrategyCard from "./components/CreateNewStrategyCard/CreateNewStrategyCard"
import StrategyCard from "./components/StrategyCard/StrategyCard"
import styles from "./StrategiesDashboard.module.scss"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import useAuth from "app/Auth/useAuth"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"

function StrategiesDashboard() {
    const auth = useAuth()
    const { data: userStrategies, isLoading: isLoadingUserStrategies } = useContractRead({
        address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
        abi: strategiesManagerAbi,
        functionName: "getUserStrategies",
        args: [auth.address!],
        cacheTime: 2_000,
    })

    if (isLoadingUserStrategies) {
        return <LoadingIndicator />
    }

    return (
        <div className={styles.strategiesDashboard}>
            {userStrategies?.map(strategy => (
                <StrategyCard
                    key={strategy.id.toString()}
                    loadingValue={false}
                    value={1234.09}
                    loadingEarnings={false}
                    earnings={-143.1}
                    {...strategy}
                />
            ))}
            <CreateNewStrategyCard />
        </div>
    )
}

export default StrategiesDashboard
