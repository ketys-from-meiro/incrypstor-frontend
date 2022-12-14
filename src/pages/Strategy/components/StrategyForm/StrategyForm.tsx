import React, { useEffect } from "react"
import { CONTRACT_ADDRESS } from "consts"
import { useContractRead } from "wagmi"
import approvedTokensAbi from "abi/ApprovedTokens.abi"
import LoadingIndicator from "components/LoadingIndicator/LoadingIndicator"
import Card from "components/Card/Card"
import styles from "./StrategyForm.module.scss"
import { useForm, useFieldArray } from "react-hook-form"
import TextField from "components/TextField/TextField"
import Button from "components/Button/Button"
import { numberInRange, required } from "utils/validation"
import TokenLogo from "components/TokenLogo/TokenLogo"
import { TokenParams } from "pages/Strategy/strategyTypes"

export type StrategyFormData = {
    name: string
    tokensParams: TokenParams[]
}

type StrategyFormProps = {
    onSubmit: (data: StrategyFormData) => void
    submitting: boolean
}

function StrategyForm({ onSubmit, submitting }: StrategyFormProps) {
    const { data: approvedTokens, isLoading: isLoadingApprovedTokens } = useContractRead({
        address: CONTRACT_ADDRESS.APPROVED_TOKENS,
        abi: approvedTokensAbi,
        functionName: "getApprovedTokens",
        cacheTime: 60_000,
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<StrategyFormData>()
    const { fields } = useFieldArray({ control, name: "tokensParams" })

    const getTokenSymbol = (address: string) => {
        const token = approvedTokens?.find(token => token.addr === address)
        return token ? token.symbol : ""
    }

    useEffect(() => {
        if (approvedTokens) {
            setValue(
                "tokensParams",
                approvedTokens.map(token => ({
                    addr: token.addr,
                    percentage: 0,
                })),
            )
        }
    }, [approvedTokens, setValue])

    if (isLoadingApprovedTokens) return <LoadingIndicator />

    return (
        <Card className={styles.strategyForm}>
            <form
                onSubmit={handleSubmit(data => {
                    onSubmit({
                        ...data,
                        tokensParams: data.tokensParams.filter(
                            tokenParam => tokenParam.percentage !== 0,
                        ),
                    })
                })}
                noValidate
            >
                <TextField
                    error={errors.name?.message}
                    label="Strategy name"
                    {...register("name", { validate: required })}
                />
                <h3>Tokens percentages</h3>
                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className={styles.tokenRow}>
                            <div className={styles.tokenInfo}>
                                <TokenLogo address={field.addr} />
                                <span>{getTokenSymbol(field.addr)}</span>
                            </div>
                            <TextField
                                error={
                                    errors.tokensParams &&
                                    errors.tokensParams[index]?.percentage?.message
                                }
                                className={styles.tokenPercentage}
                                type="number"
                                min={0}
                                max={100}
                                sufixText="%"
                                {...register(`tokensParams.${index}.percentage`, {
                                    validate: value => {
                                        return required(value) || numberInRange(value, 0, 100)
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles.submitBtnWrapper}>
                    <Button
                        type="submit"
                        color="primary"
                        className={styles.submitBtn}
                        isLoading={submitting}
                    >
                        Create strategy
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default StrategyForm
