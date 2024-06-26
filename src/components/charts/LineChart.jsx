import * as d3 from 'd3'
import { useMemo, useState } from 'react'

const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const yAccessor = data => data.sessionLength
const xAccessor = data => data.day

/**
 * Get the properties for the line chart.
 *
 * @param {Object[]} data - The data to display in the chart.
 * @returns {Object} The properties for the line chart.
 */
const properties = data => {
  const xScale = d3 // create a scale for the x-axis
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([0, 280])

  const yScale = d3 // create a scale for the y-axis
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([130, 0])

  const ticks = xScale.ticks(week.length).map(value => ({
    // create the ticks for the x-axis
    value,
    label: week[value - 1],
    xOffset: xScale(value),
  }))

  const lineGenerator = d3 // create the line path
    .line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))
    .curve(d3.curveNatural)

  return {
    ticks,
    xScale,
    yScale,
    lineGenerator,
  }
}

/**
 * Line chart component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data to display in the chart.
 * @returns {JSX.Element} The line chart component.
 */
export const LineChart = ({ data }) => {
  const extendedData = [
    { day: 0, sessionLength: 0 },
    ...data,
    { day: 8, sessionLength: 0 },
  ]

  const initTooltipData = {
    visible: false,
    x: null,
    y: null,
    value: '',
  }

  const [tooltipData, setTooltipData] = useState(initTooltipData)

  const { xScale, yScale, lineGenerator, ticks } = useMemo(
    () => properties(extendedData),
    []
  )

  const bisect = d3.bisector(xAccessor).left // create a bisector to find the closest data point

  const onMove = event => {
    const [pointerX] = d3.pointer(event)
    const indexFound = bisect(data, xScale.invert(pointerX), 1) // find the closest data point from cursor
    const session = data[indexFound - 1]

    if (!session) return false

    setTooltipData({
      visible: true,
      x: xScale(session.day),
      y: yScale(session.sessionLength),
      value: `${session.sessionLength} min`,
    })
  }

  const onLeave = () => setTooltipData({ ...initTooltipData })

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-redDark2 aspect-square">
      <svg
        className="w-full h-full"
        viewBox="0 0 260 260"
        onPointerEnter={onMove}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="gradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="hsl(0deg 0% 100% / 0.3)" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#cf0000"
          style={{
            transition: 'fill-opacity 0.25s ease-out, transform 0.25s ease-out',
          }}
          fillOpacity={!tooltipData.visible ? '0' : '1'}
          transform={`translate(${tooltipData.x - 10},0)`}
        />

        <text>
          <tspan
            x="20"
            y="30"
            fill="#ffffff"
            fontSize="0.9375rem"
            fillOpacity="0.5"
          >
            Durée moyenne des
          </tspan>
          <tspan
            x="20"
            y="30"
            dy="25"
            fill="#ffffff"
            fontSize="0.9375rem"
            fillOpacity="0.5"
          >
            sessions
          </tspan>
        </text>
        <g transform="translate(-10,  55)">
          <path
            d={lineGenerator(extendedData)}
            fill="none"
            stroke="url('#gradient')"
            strokeWidth="2"
          />
          {ticks.map(({ value, label, xOffset }) => (
            <g key={value} transform={`translate(${xOffset}, 185)`}>
              <text
                key={value}
                style={{
                  fontSize: '10px',
                  fillOpacity: '0.5',
                  textAnchor: 'middle',
                  fill: 'white',
                }}
              >
                {label}
              </text>
            </g>
          ))}
        </g>
        <g
          transform="translate(-10,  55)"
          className={!tooltipData.visible ? 'opacity-0' : ''}
        >
          <circle
            cx={tooltipData.x}
            cy={tooltipData.y}
            r="4"
            strokeWidth="8"
            stroke="white"
            strokeOpacity="20%"
            fill="white"
          />

          <rect
            x={tooltipData.x - 20}
            y={tooltipData.y - 50}
            width="40px"
            height="25px"
            fill="white"
            rx="5"
            ry="5"
          />
          <text
            x={tooltipData.x - 13}
            y={tooltipData.y - 34}
            fontSize="0.5rem"
            fontWeight="500"
            fill="black"
          >
            {tooltipData.value}
          </text>
        </g>
      </svg>
    </div>
  )
}
