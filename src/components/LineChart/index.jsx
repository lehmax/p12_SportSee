import * as d3 from 'd3'

const settings = {
  width: 300,
  height: 263,
  marginTop: 150,
  marginBottom: 20,
}

const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const LineChart = ({ title, data }) => {
  const width = settings.width
  const height = settings.height - settings.marginTop - settings.marginBottom
  const yAccessor = (data) => data.sessionLength
  const xAccessor = (data) => data.day

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([20, width])

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .rangeRound([height, 0])

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

  return (
    <div className="relative w-full rounded bg-red aspect-square">
      <span className="absolute text-white top-5 left-5">{title}</span>
      <svg className="w-full h-full">
        <path
          d={lineGenerator(data)}
          fill="none"
          stroke="white"
          strokeWidth="3"
          transform={`translate(-30, ${settings.marginTop - 50}), scale(1.25)`}
        />
        <g transform={`translate(0 ${settings.marginTop})`}>
          {ticks.map(({ value, label, xOffset }) => (
            <g
              key={value}
              transform={`translate(${xOffset}, ${settings.marginTop})`}
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
      </svg>
    </div>
  )
}

export default LineChart
