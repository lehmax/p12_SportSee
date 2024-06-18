import * as d3 from 'd3'
import { useMemo, useState } from 'react'

const weightAccessor = data => data.kilogram
const yAccessor = weightAccessor
const xAccessor = data => data.day
const formatTime = d3.utcFormat('%A %d')
const keys = ['kilogram', 'calories']

const properties = data => {
  const xScaleKilogram = d3
    .scaleBand()
    .range([0, 800])
    .domain(data.map(xAccessor))
    .paddingInner(0)
    .padding(0.8)

  const xGroup = d3
    .scaleBand()
    .domain(keys)
    .range([0, xScaleKilogram.bandwidth()])
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

  const xTicks = xScaleKilogram.domain().map(value => ({
    value: formatTime(new Date(value)),
    xOffset: xScaleKilogram(value) + xScaleKilogram.bandwidth() / 2,
  }))

  const ySteps = yScaleKilogram.domain().map(value => ({
    value,
    yOffset: yScaleKilogram(value),
  }))

  return {
    xScaleKilogram,
    xGroup,
    yScaleKilogram,
    yScaleCalories,
    xTicks,
    ySteps,
  }
}

export const BarChart = ({ data }) => {
  const [tooltip, setTooltip] = useState({
    display: false,
    data: {},
    pos: { x: 0, y: 0 },
  })

  const {
    xTicks,
    ySteps,
    xScaleKilogram,
    xGroup,
    yScaleCalories,
    yScaleKilogram,
  } = useMemo(() => properties(data), [])

  const onEnter = (event, data) => {
    setTooltip({
      display: true,
      data: {
        day: data.day,
        kilogram: data.kilogram,
        calories: data.calories,
      },
      pos: { x: event.clientX, y: event.clientY },
    })
  }

  const onLeave = () => {
    setTooltip({ ...tooltip, display: false })
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-greyLight">
      <svg className="w-full h-full" viewBox="0 0 800 300">
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
          <g
            key={data.day}
            transform={`translate(${xScaleKilogram(data.day)},0)`}
          >
            <rect
              x={-xScaleKilogram.bandwidth()}
              y={ySteps.at(-1).yOffset}
              width={xScaleKilogram.bandwidth() * 3}
              height={250 - ySteps.at(-1).yOffset}
              className="cursor-pointer"
              opacity={
                tooltip.display && tooltip.data.day === data.day ? '0.5' : '0'
              }
              fill="#C4C4D4"
            />
            <rect
              x={xScaleKilogram.bandwidth() + 20}
              y={ySteps.at(-1).yOffset - 32}
              width="40px"
              height="64px"
              opacity={
                tooltip.display && tooltip.data.day === data.day ? '1' : '0'
              }
              fill="#E60000"
              rx="3"
              ry="3"
            />
            <text
              fontSize="0.4375rem"
              opacity={
                tooltip.display && tooltip.data.day === data.day ? '1' : '0'
              }
              fontWeight="500"
              fill="white"
            >
              {keys.map((key, index) => (
                <tspan
                  x={xScaleKilogram.bandwidth() + 25}
                  y={ySteps.at(-1).yOffset - 10}
                  dy={index === keys.length - 1 && 30}
                  key={key}
                >
                  {key === 'kilogram' ? `${data[key]} kg` : `${data[key]} kCal`}
                </tspan>
              ))}
            </text>

            {keys.map(key => (
              <rect
                key={key}
                x={key === 'kilogram' ? xGroup(key) - 4 : xGroup(key) + 4}
                ry="5"
                y={
                  key === 'kilogram'
                    ? yScaleKilogram(data[key])
                    : yScaleCalories(data[key])
                }
                width={xGroup.bandwidth()}
                height={
                  250 -
                  (key === 'kilogram'
                    ? yScaleKilogram(data[key])
                    : yScaleCalories(data[key]))
                }
                fill={key === 'kilogram' ? '#282D30' : '#E60000'}
              />
            ))}

            <rect
              x={-xScaleKilogram.bandwidth()}
              y={ySteps.at(-1).yOffset}
              width={xScaleKilogram.bandwidth() * 3}
              height={250 - ySteps.at(-1).yOffset}
              className="cursor-pointer"
              opacity="0"
              fill="transparent"
              onMouseEnter={event => onEnter(event, data)}
              onMouseLeave={onLeave}
            />
          </g>
        ))}
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
      </svg>
    </div>
  )
}
