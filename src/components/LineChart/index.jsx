import * as d3 from 'd3'
import { useMemo } from 'react'

const getDimensions = () => {
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
  const dimensions = getDimensions()
  const yAccessor = (data) => data.sessionLength
  const xAccessor = (data) => data.day

  const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([20, dimensions.width])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .rangeRound([dimensions.innerHeight, 0])

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
    xScale,
    yScale,
    ticks,
    lineGenerator,
  }
}

const LineChart = ({ title, data }) => {
  const { dimensions, ticks, lineGenerator } = useMemo(
    () => properties(data),
    []
  )
  const { marginTop } = dimensions

  return (
    <div className="relative w-full rounded bg-red aspect-square">
      <span className="absolute text-white top-5 left-5">{title}</span>
      <svg className="w-full h-full">
        <path
          d={lineGenerator(data)}
          fill="none"
          stroke="white"
          strokeWidth="3"
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
      </svg>
    </div>
  )
}

export default LineChart
