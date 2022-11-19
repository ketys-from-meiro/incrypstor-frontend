import React from "react"
import { AxisOptions, Chart } from "react-charts"

export type TokenPercentageValue = {
    primary: string
    secondary: number
}

export type Series = {
    label: string
    data: TokenPercentageValue[]
}

const data: Series[] = [
    {
        label: "LINK",
        data: [
            {
                primary: "Current %",
                secondary: 88,
            },
        ],
    },
    {
        label: "UNI",
        data: [
            {
                primary: "Current %",
                secondary: 12,
            },
        ],
    },
]

function TokensPercentageChart() {
    const primaryAxis = React.useMemo<AxisOptions<typeof data[number]["data"][number]>>(
        () => ({
            position: "left",
            getValue: datum => datum.primary,
        }),
        [],
    )

    const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]["data"][number]>[]>(
        () => [
            {
                position: "bottom",
                getValue: datum => datum.secondary,
                stacked: true,
            },
        ],
        [],
    )

    return (
        <Chart
            options={{
                data,
                primaryAxis,
                secondaryAxes,
            }}
        />
    )
}

export default TokensPercentageChart
