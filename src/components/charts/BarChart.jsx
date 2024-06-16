import * as d3 from 'd3'
import { useMemo } from 'react'

const weightAccessor = data => data.kilogram
const yAccessor = weightAccessor
const xAccessor = data => data.day
const formatTime = d3.utcFormat('%A %d')
const keys = ['kilogram', 'calories']

const properties = data => {
  const xScale0 = d3
    .scaleBand()
    .range([0, 800])
    .domain(data.map(xAccessor))
    .paddingInner(0)
    .padding(0.8)

  const xScale1 = d3
    .scaleBand()
    .domain(keys)
    .range([0, xScale0.bandwidth()])
    .padding(0.05)

  const yScaleKilogram = d3
    .scaleBand()
    .domain(data.map(yAccessor).reverse())
    .range([250, 100])

  const yScaleCalories = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))])
    .nice()
    .range([250, 100])

  const xTicks = xScale0.domain().map(value => ({
    value: formatTime(new Date(value)),
    xOffset: xScale0(value) + xScale0.bandwidth() / 2,
  }))

  const ySteps = yScaleKilogram.domain().map(value => ({
    value,
    yOffset: yScaleKilogram(value),
  }))

  return {
    xScale0,
    xScale1,
    yScaleKilogram,
    yScaleCalories,
    xTicks,
    ySteps,
  }
}

export const BarChart = ({ data }) => {
  console.log(data)
  const { xTicks, ySteps, xScale0, xScale1, yScaleCalories, yScaleKilogram } =
    useMemo(() => properties(data), [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-greyLight">
      <svg className="w-full h-full" viewBox="0 0 800 300">
        <text>
          <tspan x="30" y="40" fill="#20253A" fontSize="0.9375rem">
            Activité quotidienne
          </tspan>
        </text>
        <g>
          <circle cx="570" cy="35" r="3" fill="#282D30" />
          <text>
            <tspan x="582" y="40" fill="#20253A" fontSize="0.875rem">
              Poids (kg)
            </tspan>
          </text>
        </g>
        <g>
          <circle cx="680" cy="35" r="3" fill="#E60000" />
          <text>
            <tspan x="692" y="40" fill="#20253A" fontSize="0.875rem">
              Calories (kCal)
            </tspan>
          </text>
        </g>
        <g>
          <path d="M 40 250 H 760" stroke="#DEDEDE" />
          {xTicks.map(({ value, xOffset }, i) => (
            <text
              key={i}
              x={xOffset}
              y={280}
              fill="#9B9EAC"
              fontSize="0.6875rem"
              textAnchor="middle"
            >
              {value}
            </text>
          ))}
        </g>
        <g>
          {ySteps.map(({ value, yOffset }, i) => (
            <g key={i}>
              <path
                d={`M 40 ${yOffset} H 760`}
                stroke="#DEDEDE"
                strokeDasharray="2,2"
              />
              <text
                x={780}
                y={yOffset + 5}
                fill={i === ySteps.length - 1 ? '#FBEAEA' : '#9B9EAC'}
                fontSize="0.6875rem"
                textAnchor="middle"
              >
                {value}
              </text>
            </g>
          ))}
        </g>
        {data.map(data => (
          <g key={data.day} transform={`translate(${xScale0(data.day)},0)`}>
            {keys.map(key => (
              <rect
                key={key}
                x={key === 'kilogram' ? xScale1(key) - 4 : xScale1(key) + 4}
                ry="5"
                y={
                  key === 'kilogram'
                    ? yScaleKilogram(data[key])
                    : yScaleCalories(data[key])
                }
                width={xScale1.bandwidth()}
                height={
                  250 -
                  (key === 'kilogram'
                    ? yScaleKilogram(data[key])
                    : yScaleCalories(data[key]))
                }
                fill={key === 'kilogram' ? '#282D30' : '#E60000'}
              />
            ))}
          </g>
        ))}
        {/* {weightRectangles.map((data, i) => (
          <rect
            key={i}
            x={data.x}
            y={data.y}
            width={data.width}
            height={data.height}
            fill="#282D30"
            rx="5"
          />
        ))}
        {caloriesRectangles.map((data, i) => (
          <rect
            key={i}
            x={data.x}
            y={data.y}
            width={data.width}
            height={data.height}
            fill="#E60000"
            rx="5"
          />
        ))} */}
      </svg>
    </div>
  )
}
