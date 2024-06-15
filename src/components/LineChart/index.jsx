import * as d3 from 'd3'
import { useMemo, useState } from 'react'

const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const yAccessor = data => data.sessionLength
const xAccessor = data => data.day

const initTooltipData = {
  visible: false,
  x: null,
  y: null,
  value: '',
}

const initDimensions = () => {
  const width = 320
  const height = 263
  const marginTop = 110
  const innerHeight = height - marginTop

  return {
    width,
    height,
    marginTop,
    innerHeight,
  }
}

const properties = data => {
  const dimensions = initDimensions()

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([0, 350])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dimensions.innerHeight, 0])

  const ticks = xScale.ticks(week.length).map(value => ({
    value,
    label: week[value - 1],
    xOffset: xScale(value),
  }))

  const lineGenerator = d3
    .line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))
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
  const extendedData = [
    { day: 0, sessionLength: 0 },
    ...data,
    { day: 8, sessionLength: 0 },
  ]
  const [tooltipData, setTooltipData] = useState(initTooltipData)
  const { xScale, yScale, dimensions, lineGenerator, ticks } = useMemo(
    () => properties(extendedData),
    []
  )

  const onLeave = () => setTooltipData({ ...initTooltipData, visible: false })

  const bisect = d3.bisector(xAccessor).left
  const onMove = event => {
    const [pointerX] = d3.pointer(event)
    const indexFound = bisect(data, xScale.invert(pointerX), 1)
    const session = data[indexFound - 1]

    if (!session) return false

    setTooltipData({
      visible: true,
      x: xScale(session.day),
      y: yScale(session.sessionLength),
      value: `${session.sessionLength} min`,
    })
  }

  const { marginTop } = dimensions

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-redDark2 aspect-square">
      <div
        style={{ transform: `translateX(${tooltipData.x - 10}px)` }}
        className={`w-full absolute top-0 transition duration-300 ease-in-out left-0 z-10 h-full bg-redDark ${
          !tooltipData.visible ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="relative z-20 w-full h-full">
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
          <g transform={`translate(-10,  ${marginTop})`}>
            <path
              d={lineGenerator(extendedData)}
              fill="none"
              stroke="url('#gradient')"
              strokeWidth="3"
            />
            {ticks.map(({ value, label, xOffset }) => (
              <g
                key={value}
                transform={`translate(${xOffset}, ${marginTop + 100})`}
              >
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
          <g
            transform={`translate(-10,  ${marginTop})`}
            className={!tooltipData.visible ? 'opacity-0' : ''}
          >
            <circle
              cx={tooltipData.x}
              cy={tooltipData.y}
              r="8"
              strokeWidth="5"
              stroke="white"
              strokeOpacity="50%"
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
              fontFamily="Verdana"
              fontSize="8px"
              fontWeight="500"
              fill="black"
            >
              {tooltipData.value}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default LineChart
