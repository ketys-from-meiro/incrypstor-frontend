import { CONTRACT_ADDRESS } from "consts"
import React, { useEffect, useState } from "react"
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import StrategyForm, { StrategyFormData } from "../components/StrategyForm/StrategyForm"
import styles from "./StrategyCreate.module.scss"
import strategiesManagerAbi from "abi/StrategiesManager.abi"
import { useNavigate } from "react-router-dom"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"
import { toast } from "react-toastify"

function StrategyCreate() {
    const [submittingData, setSubmittingData] = useState<StrategyFormData | null>(null)

    const navigate = useNavigate()

    const {
        config,
        isSuccess: isPrepareContractWriteSuccess,
        isError: isPrepareContractWriteError,
    } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS.STRATEGY_MANAGER,
        abi: strategiesManagerAbi,
        functionName: "createStrategy",
        args: [submittingData?.name ?? "", submittingData?.tokensParams ?? []],
        enabled: submittingData !== null,
    })
    const {
        write,
        data: dataContractWrite,
        isSuccess: isContractWriteSuccess,
        isError: isContractWriteError,
    } = useContractWrite(config)
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSucceed } =
        useWaitForTransaction({
            hash: dataContractWrite?.hash,
        })

    useEffect(() => {
        if (isPrepareContractWriteError || isContractWriteError) {
            setSubmittingData(null)
        }
    }, [isPrepareContractWriteError, isContractWriteError])

    useEffect(() => {
        if (isPrepareContractWriteSuccess) {
            write?.()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPrepareContractWriteSuccess])

    useEffect(() => {
        if (isContractWriteSuccess) {
            setSubmittingData(null)
        }
    }, [isContractWriteSuccess])

    useEffect(() => {
        if (isTransactionSucceed) {
            toast.success("Strategy created.")
            navigate("/")
        }
    }, [isTransactionSucceed, navigate])

    const createStrategy = (data: StrategyFormData) => {
        setSubmittingData(data)
    }

    return (
        <div className={styles.strategyCreate}>
            {isWaitingForTransaction ? (
                <>
                    <h1>Waiting for transaction</h1>
                    <LoadingIndicator />
                </>
            ) : (
                <>
                    <h1>Create your investment strategy</h1>
                    <StrategyForm onSubmit={createStrategy} submitting={submittingData !== null} />
                </>
            )}
            {}
        </div>
    )
}

export default StrategyCreate
