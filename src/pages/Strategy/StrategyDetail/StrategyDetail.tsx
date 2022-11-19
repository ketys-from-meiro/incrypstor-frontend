import { CONTRACT_ADDRESS } from "consts"
import React, { useState } from "react"
import { useContractReads } from "wagmi"
import styles from "./StrategyDetail.module.scss"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import useAuth from "app/Auth/useAuth"
import { BigNumber } from "ethers"
import { useNavigate, useParams } from "react-router-dom"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import Button from "components/Button/Button"
import InvestModalForm from "../components/InvestModalForm/InvestModalForm"
import PerformanceChart from "../components/PerformanceChart/PerformanceChart"
import { getTokenInfo } from "../strategyUtils"
import TokenLogo from "components/TokenLogo/TokenLogo"

const strategyContract = {
    address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
    abi: strategiesManagerAbi,
}

function StrategyDetail() {
    const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const { strategyId } = useParams()
    const {
        data,
        isLoading: isLoadingData,
        isError,
    } = useContractReads({
        contracts: [
            {
                ...strategyContract,
                functionName: "getUserStrategy",
                args: [auth.address!, BigNumber.from(strategyId)],
            },
        ],
    })

    if (isLoadingData) return <LoadingIndicator />
    if (isError) {
        // TODO:
        return <p>Something went wrong...</p>
    }

    const strategy = data![0]

    return (
        <div className={styles.strategyDetail}>
            <header>
                <div className={styles.strategyName}>
                    <button onClick={() => navigate("/")}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div>
                        <label>Strategy name</label>
                        <h1>{strategy.name}</h1>
                    </div>
                </div>
                <div className={styles.valuesAndCta}>
                    <div className={styles.valuation}>
                        <div>
                            <label>Value</label>
                            <span>1234.09 ETH</span>
                        </div>
                        <div>
                            <label>Earnings</label>
                            <span className={styles.red}>-143.1 ETH</span>
                        </div>
                    </div>
                    <Button color="primary" onClick={() => setIsInvestModalOpen(true)}>
                        <FontAwesomeIcon icon={faPaperPlane} /> Invest
                    </Button>
                </div>
            </header>
            <div className={styles.performanceChart}>
                <PerformanceChart />
            </div>
            <div className={styles.tokensSection}>
                <div className={styles.tokensList}>
                    <h2>Tokens</h2>
                    <ul>
                        {strategy.tokensParams.map(tokenParam => {
                            const tokenInfo = getTokenInfo(tokenParam.addr)
                            return (
                                <li key={tokenParam.addr}>
                                    <TokenLogo address={tokenParam.addr} />
                                    <div className={styles.tokenInfo}>
                                        <div className={styles.firstRow}>
                                            <span>{tokenInfo?.symbol ?? "N/A"}</span>
                                            <span>Target: {tokenParam.percentage}%</span>
                                        </div>
                                        <div className={styles.secondRow}>
                                            {tokenInfo?.description ?? "N/A"}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {isInvestModalOpen && (
                <InvestModalForm
                    isOpen={isInvestModalOpen}
                    onClose={() => setIsInvestModalOpen(false)}
                    strategy={strategy}
                />
            )}
        </div>
    )
}

export default StrategyDetail
