import { CONTRACT_ADDRESS } from "consts"
import React, { useState } from "react"
import { useContractRead } from "wagmi"
import CreateNewStrategyCard from "./components/CreateNewStrategyCard/CreateNewStrategyCard"
import StrategyCard from "./components/StrategyCard/StrategyCard"
import styles from "./StrategiesDashboard.module.scss"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import useAuth from "app/Auth/useAuth"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"
import InvestModalForm from "../components/InvestModalForm/InvestModalForm"
import { Strategy } from "../strategyTypes"
import PerformanceChart from "../components/PerformanceChart/PerformanceChart"

function StrategiesDashboard() {
    type InvestModalState =
        | {
              strategy: null | Strategy
              isOpen: false
          }
        | {
              strategy: Strategy
              isOpen: true
          }
    const [investModal, setInvestModal] = useState<InvestModalState>({
        strategy: null,
        isOpen: false,
    })
    const auth = useAuth()
    const { data: userStrategies, isLoading: isLoadingUserStrategies } = useContractRead({
        address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
        abi: strategiesManagerAbi,
        functionName: "getUserStrategies",
        args: [auth.address!],
    })

    const handleInvestClick = (strategy: Strategy) => {
        setInvestModal({
            strategy,
            isOpen: true,
        })
    }

    const closeInvestModal = () => {
        setInvestModal(prevState => ({
            ...prevState,
            isOpen: false,
        }))
    }

    if (isLoadingUserStrategies) {
        return <LoadingIndicator />
    }

    return (
        <>
            <div className={styles.portfolioPerformance}>
                <header>
                    <h1>Portfolio performance</h1>
                    <div className={styles.valuation}>
                        <div>
                            <label>Value</label>
                            <span>2468.18 ETH</span>
                        </div>
                        <div>
                            <label>Earnings</label>
                            <span className={styles.red}>-286.2 ETH</span>
                        </div>
                    </div>
                </header>
                <div className={styles.performanceChart}>
                    <PerformanceChart dataType="dashboard" />
                </div>
            </div>
            <div className={styles.strategiesDashboard}>
                {userStrategies?.map(strategy => (
                    <StrategyCard
                        key={strategy.id.toString()}
                        loadingValue={false}
                        value={1234.09}
                        loadingEarnings={false}
                        earnings={-143.1}
                        onInvestClick={() => handleInvestClick(strategy)}
                        {...strategy}
                    />
                ))}
                <CreateNewStrategyCard />
                {investModal.isOpen && (
                    <InvestModalForm
                        isOpen={investModal.isOpen}
                        onClose={closeInvestModal}
                        strategy={investModal.strategy}
                    />
                )}
            </div>
        </>
    )
}

export default StrategiesDashboard
