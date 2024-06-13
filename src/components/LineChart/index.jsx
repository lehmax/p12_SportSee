import * as d3 from 'd3'
import { useMemo, useState } from 'react'

const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const yAccessor = (data) => data.sessionLength
const xAccessor = (data) => data.day
const initTooltipData = {
  visible: false,
  x: null,
  y: null,
  value: '',
}

const initDimensions = () => {
  const width = 300
  const height = 263
  const marginTop = 150
  const marginBottom = 20
  const innerHeight = height - marginTop - marginBottom

  return {
    width,
    height,
    marginTop,
    marginBottom,
    innerHeight,
  }
}

const properties = (data) => {
  const dimensions = initDimensions()

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([20, dimensions.width])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .range([dimensions.innerHeight, 0])

  const ticks = xScale.ticks(week.length).map((value) => ({
    value,
    label: week[value - 1],
    xOffset: xScale(value),
  }))

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))
    .curve(d3.curveNatural)

  return {
    dimensions,
    ticks,
    xScale,
    yScale,
    lineGenerator,
  }
}

const LineChart = ({ title, data }) => {
  const [tooltipData, setTooltipData] = useState(initTooltipData)
  const { xScale, yScale, dimensions, lineGenerator, ticks } = useMemo(
    () => properties(data),
    []
  )

  const onLeave = () => setTooltipData({ ...initTooltipData, visible: false })

  const bisect = d3.bisector(xAccessor).left
  const onMove = (event) => {
    const [pointerX] = d3.pointer(event)
    console.log(pointerX)
    const indexFound = bisect(data, xScale.invert(pointerX), 1)
    const session = data[indexFound]

    if (!session) return

    setTooltipData({
      visible: true,
      x: xScale(session.day),
      y: yScale(session.sessionLength),
      value: session.sessionLength,
    })
  }

  const { marginTop } = dimensions

  return (
    <div className="relative w-full rounded-xl bg-red aspect-square">
      <span className="absolute text-white opacity-50 text- top-10 left-10 max-w-40">
        {title}
      </span>
      <svg
        className="w-full h-full"
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
        <path
          d={lineGenerator(data)}
          fill="none"
          stroke="url('#gradient')"
          strokeWidth="2"
          transform={`translate(-30, ${marginTop - 50}), scale(1.25)`}
        />
        <g transform={`translate(0 ${marginTop})`}>
          {ticks.map(({ value, label, xOffset }) => (
            <g key={value} transform={`translate(${xOffset}, ${marginTop})`}>
              <text
                key={value}
                style={{
                  fontSize: '12px',
                  textAnchor: 'middle',
                  fill: 'white',
                }}
              >
                {label}
              </text>
            </g>
          ))}
        </g>
        <g className={!tooltipData.visible ? 'hidden' : ''}>
          <circle
            cx={tooltipData.x}
            cy={tooltipData.y}
            r="8"
            strokeWidth="5"
            stroke="white"
            strokeOpacity="50%"
            fill="white"
          />
          <g>
            <rect
              x={tooltipData.x + 4}
              y={tooltipData.y - 11}
              width="39px"
              height="25px"
              fill="white"
            />
            <text
              x="8px"
              y="12px"
              fontFamily="Verdana"
              fontSize="8px"
              fontWeight="500"
              fill="black"
            >
              {tooltipData.value}
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default LineChart
