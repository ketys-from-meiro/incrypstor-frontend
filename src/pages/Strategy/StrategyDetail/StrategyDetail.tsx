import { CONTRACT_ADDRESS, API, CHAIN_ID } from "consts"
import React, { useEffect, useState } from "react"
import { useContractReads, useContractWrite, useWaitForTransaction } from "wagmi"
import styles from "./StrategyDetail.module.scss"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import useAuth from "app/Auth/useAuth"
import { BigNumber, ethers } from "ethers"
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
import TokensPercentageChart from "./components/TokensPercentageChart"
import { toast } from "react-toastify"

const ONE_QUOTE_GAS_LIMIT = 350000
const CLOSE_STRATEGY_TX_BASE_GAS_LIMIT = 350000

const strategyContract = {
    address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
    abi: strategiesManagerAbi,
}

function StrategyDetail() {
    const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const { strategyId } = useParams()

    type Quote = {
        token: `0x${string}`
        spender: `0x${string}`
        swapCallData: `0x${string}`
        gasPrice: BigNumber
    }
    type QuotesState = {
        isLoading: boolean
        quotesLoaded: number
        nonWethTxsGas: number
        quotes: Quote[]
    }
    const [quotesTotalGasPrice, setQuotesTotalGasPrice] = useState<BigNumber>(BigNumber.from("0"))
    const [quotes, setQuotes] = useState<QuotesState>({
        isLoading: false,
        quotesLoaded: 0,
        nonWethTxsGas: 0,
        quotes: [],
    })

    // TODO: refactor into single read...
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

    const {
        write,
        data: dataContractWrite,
        isLoading: isDataContractWriteLoading,
        isError: isContractWriteError,
        isSuccess: isContractWriteSuccess,
    } = useContractWrite({
        ...strategyContract,
        functionName: "closeStrategy",
        args: [data?.[0]?.id ?? BigNumber.from("0"), quotes.quotes],
        mode: "recklesslyUnprepared",
        chainId: CHAIN_ID,
        overrides: {
            value: quotesTotalGasPrice ?? BigNumber.from("0"),
            gasLimit: BigNumber.from(CLOSE_STRATEGY_TX_BASE_GAS_LIMIT + quotes.nonWethTxsGas),
        },
    })
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSuccessful } =
        useWaitForTransaction({
            hash: dataContractWrite?.hash,
        })

    useEffect(() => {
        if (quotes.quotesLoaded === data?.[0]?.tokensParams.length) {
            setQuotes(prevState => ({
                ...prevState,
                isLoading: false,
            }))
            write?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quotes.quotesLoaded, data?.[0]?.tokensParams.length])

    useEffect(() => {
        if (isContractWriteError) {
            setQuotesTotalGasPrice(BigNumber.from("0"))
            setQuotes({ isLoading: false, quotesLoaded: 0, nonWethTxsGas: 0, quotes: [] })
        }
    }, [isContractWriteError])

    useEffect(() => {
        if (isTransactionSuccessful && isContractWriteSuccess) {
            toast.success("Strategy closed, funds sent to your wallet.")
            navigate("/")
        }
    }, [isTransactionSuccessful, isContractWriteSuccess, navigate])

    if (isLoadingData || !data || !data[0]) return <LoadingIndicator />
    if (isError) {
        // TODO:
        return <p>Something went wrong...</p>
    }

    const strategy = data[0]

    const onCloseStrategyClick = () => {
        setQuotes({ isLoading: true, quotesLoaded: 0, nonWethTxsGas: 0, quotes: [] })
        strategy.tokensParams.forEach(async tokenParam => {
            if (tokenParam.addr !== CONTRACT_ADDRESS.WETH) {
                const qs = new URLSearchParams({
                    buyToken: CONTRACT_ADDRESS.WETH,
                    sellToken: tokenParam.addr,
                    sellAmount: tokenParam.holdings.toString(),
                }).toString()
                const quoteUrl = `${API.ZERO_X}swap/v1/quote?${qs}`
                const response = await fetch(quoteUrl)
                const quote = await response.json()
                setQuotesTotalGasPrice(prevState => prevState.add(quote.gasPrice))
                setQuotes(prevState => ({
                    ...prevState,
                    quotesLoaded: prevState.quotesLoaded + 1,
                    nonWethTxsGas: prevState.nonWethTxsGas + ONE_QUOTE_GAS_LIMIT,
                    quotes: [
                        ...prevState.quotes,
                        {
                            token: quote.sellTokenAddress,
                            spender: quote.allowanceTarget,
                            swapCallData: quote.data,
                            gasPrice: quote.gasPrice,
                        },
                    ],
                }))
            } else {
                setQuotes(prevState => ({
                    ...prevState,
                    quotesLoaded: prevState.quotesLoaded + 1,
                }))
            }
        })
    }

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
                                            <span>
                                                Target: {tokenParam.percentage}
                                                %&nbsp;/&nbsp;Balance:{" "}
                                                {(+ethers.utils.formatEther(
                                                    tokenParam.holdings,
                                                )).toFixed(3)}
                                            </span>
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
                <div className={styles.tokensPercentageChart}>
                    <TokensPercentageChart />
                </div>
                <div className={styles.actionButtons}>
                    <Button color="secondary">Rebalance (coming soon)</Button>
                    <Button
                        isLoading={isDataContractWriteLoading || isWaitingForTransaction}
                        color="danger"
                        onClick={onCloseStrategyClick}
                    >
                        Close & withdraw
                    </Button>
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
