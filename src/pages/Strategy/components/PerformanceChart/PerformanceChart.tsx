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

const dataDetail: Series[] = [
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

const dataDashboard: Series[] = [
    {
        label: "Investments",
        data: [
            {
                date: new Date("2022-10-24"),
                value: 0,
            },
            {
                date: new Date("2022-10-31"),
                value: 700,
            },
            {
                date: new Date("2022-11-07"),
                value: 1400,
            },
            {
                date: new Date("2022-11-14"),
                value: 2100,
            },
            {
                date: new Date("2022-11-21"),
                value: 2754.38,
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
                value: 700,
            },
            {
                date: new Date("2022-11-07"),
                value: 1466.22,
            },
            {
                date: new Date("2022-11-14"),
                value: 2122.43,
            },
            {
                date: new Date("2022-11-21"),
                value: 2468.18,
            },
        ],
    },
]

function PerformanceChart({ dataType = "detail" }: { dataType?: "detail" | "dashboard" }) {
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
                data: dataType === "detail" ? dataDetail : dataDashboard,
                primaryAxis,
                secondaryAxes,
                interactionMode: "primary",
            }}
        />
    )
}

export default PerformanceChart
