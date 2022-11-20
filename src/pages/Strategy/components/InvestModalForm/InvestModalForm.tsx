import Modal from "components/Modal/Modal"
import { BigNumber } from "ethers"
import React, { useEffect, useState } from "react"
import styles from "./InvestModalForm.module.scss"
import { useForm } from "react-hook-form"
import TextField from "components/TextField/TextField"
import { required } from "utils/validation"
import Button from "components/Button/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import { useContractWrite, useWaitForTransaction } from "wagmi"
import { API, CHAIN_ID, CONTRACT_ADDRESS } from "consts"
import { Strategy } from "pages/Strategy/strategyTypes"
import { ethers } from "ethers"
import { toast } from "react-toastify"

const ONE_QUOTE_GAS_LIMIT = 350000
const INVEST_TX_BASE_GAS_LIMIT = 250000

type InvestModalFormProps = {
    isOpen: boolean
    onClose: () => void
    strategy: Strategy
}

type InvestModalFormData = {
    amount: string
}

function InvestModalForm({ isOpen, onClose, strategy }: InvestModalFormProps) {
    const [submittedValue, setSubmittedValue] = useState<BigNumber | null>(null)
    const [totalValue, setTotalValue] = useState<BigNumber | null>(null)

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
    const [quotes, setQuotes] = useState<QuotesState>({
        isLoading: false,
        quotesLoaded: 0,
        nonWethTxsGas: 0,
        quotes: [],
    })

    const {
        write,
        data: dataContractWrite,
        isError: isContractWriteError,
    } = useContractWrite({
        address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
        abi: strategiesManagerAbi,
        functionName: "investIntoYourStrategy",
        args: [strategy.id, submittedValue ?? BigNumber.from("0"), quotes.quotes],
        mode: "recklesslyUnprepared",
        chainId: CHAIN_ID,
        overrides: {
            value: totalValue ?? BigNumber.from("0"),
            gasLimit: BigNumber.from(INVEST_TX_BASE_GAS_LIMIT + quotes.nonWethTxsGas),
        },
    })
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSuccessful } =
        useWaitForTransaction({
            hash: dataContractWrite?.hash,
        })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InvestModalFormData>({
        defaultValues: {
            amount: "0.01",
        },
    })

    const onSubmit = (data: InvestModalFormData) => {
        setSubmittedValue(ethers.utils.parseUnits(data.amount))
        setTotalValue(ethers.utils.parseUnits(data.amount))
        setQuotes({ isLoading: true, quotesLoaded: 0, nonWethTxsGas: 0, quotes: [] })
        strategy.tokensParams.forEach(async tokenParam => {
            if (tokenParam.addr !== CONTRACT_ADDRESS.WETH) {
                const qs = new URLSearchParams({
                    sellToken: CONTRACT_ADDRESS.WETH,
                    buyToken: tokenParam.addr,
                    sellAmount: ethers.utils
                        .parseUnits(data.amount)
                        .div(100)
                        .mul(tokenParam.percentage)
                        .toString(),
                }).toString()
                const quoteUrl = `${API.ZERO_X}swap/v1/quote?${qs}`
                const response = await fetch(quoteUrl)
                const quote = await response.json()
                setTotalValue(prevState => prevState!.add(quote.gasPrice))
                setQuotes(prevState => ({
                    ...prevState,
                    quotesLoaded: prevState.quotesLoaded + 1,
                    nonWethTxsGas: prevState.nonWethTxsGas + ONE_QUOTE_GAS_LIMIT,
                    quotes: [
                        ...prevState.quotes,
                        {
                            token: quote.buyTokenAddress,
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

    useEffect(() => {
        if (quotes.quotesLoaded === strategy.tokensParams.length) {
            setQuotes(prevState => ({
                ...prevState,
                isLoading: false,
            }))
            write?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quotes.quotesLoaded, strategy.tokensParams.length])

    useEffect(() => {
        if (isContractWriteError) {
            setSubmittedValue(null)
            setQuotes({ isLoading: false, quotesLoaded: 0, nonWethTxsGas: 0, quotes: [] })
        }
    }, [isContractWriteError])

    useEffect(() => {
        if (isTransactionSuccessful) {
            toast.success("Investment successful.")
            onClose()
        }
    }, [isTransactionSuccessful, onClose])

    return (
        <Modal isOpen={isOpen} title={`Invest into '${strategy.name}' strategy`} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.investModalForm}>
                <TextField
                    error={errors.amount?.message}
                    type="number"
                    min={0.01}
                    step={0.01}
                    sufixText="ETH"
                    {...register("amount", {
                        validate: required,
                    })}
                />
                <Button
                    color="primary"
                    type="submit"
                    className={styles.investButton}
                    isLoading={quotes.isLoading || isWaitingForTransaction}
                >
                    <FontAwesomeIcon icon={faPaperPlane} /> Invest
                </Button>
            </form>
            {isWaitingForTransaction && (
                <p className={styles.waitingForTxMessage}>Waiting for transaction...</p>
            )}
        </Modal>
    )
}

export default InvestModalForm
