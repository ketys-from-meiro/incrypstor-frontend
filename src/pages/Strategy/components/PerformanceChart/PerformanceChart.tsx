import React from "react"
import { AxisOptions, Chart } from "react-charts"

export type DayValue = {
    date: Date
    value: number
}

export type Series = {
    label: string
    data: DayValue[]
}

const data: Series[] = [
    {
        label: "Investments",
        data: [
            {
                date: new Date("2022-10-24"),
                value: 0,
            },
            {
                date: new Date("2022-10-31"),
                value: 350,
            },
            {
                date: new Date("2022-11-07"),
                value: 700,
            },
            {
                date: new Date("2022-11-14"),
                value: 1050,
            },
            {
                date: new Date("2022-11-21"),
                value: 1377.19,
            },
        ],
    },
    {
        label: "Valuation",
        data: [
            {
                date: new Date("2022-10-24"),
                value: 0,
            },
            {
                date: new Date("2022-10-31"),
                value: 350,
            },
            {
                date: new Date("2022-11-07"),
                value: 743.21,
            },
            {
                date: new Date("2022-11-14"),
                value: 1021.18,
            },
            {
                date: new Date("2022-11-21"),
                value: 1234.09,
            },
        ],
    },
]

function PerformanceChart() {
    const primaryAxis = React.useMemo(
        (): AxisOptions<DayValue> => ({
            getValue: datum => datum.date,
        }),
        [],
    )

    const secondaryAxes = React.useMemo(
        (): AxisOptions<DayValue>[] => [
            {
                getValue: datum => datum.value,
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
                interactionMode: "primary",
            }}
        />
    )
}

export default PerformanceChart
