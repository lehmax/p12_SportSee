import * as d3 from 'd3'

const properties = data => {
  const score = data * 100
  const radius = 170 / 2

  const angle = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, 2 * Math.PI])

  const backgroundArc = d3
    .arc()
    .innerRadius(radius * 0.9) // We want to have a donut shape
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .cornerRadius(10)

  const arc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius)
    .startAngle(0)
    .endAngle(angle(score))
    .cornerRadius(10)

  return {
    radius,
    arc,
    backgroundArc,
  }
}

export const RadialBarChart = ({ data, title = '' }) => {
  const { radius, arc, backgroundArc } = properties(data)

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-blueLight aspect-square">
      {title !== '' && (
        <span className="absolute text-DarkBlue top-5 left-10 max-w-40">
          {title}
        </span>
      )}
      <svg className="w-full h-full" viewBox="0 0 260 260">
        <circle cx="130" cy="130" r={radius} fill="white" />
        <path
          d={backgroundArc()}
          fill="#FBFBFB"
          stroke="#FBFBFB"
          strokeWidth="1"
          transform="translate(130, 130)"
          strokeLinejoin="round"
        />
        <path
          d={arc()}
          fill="#FF0000"
          stroke="#FF0000"
          strokeWidth="1"
          transform="translate(130, 130)"
          strokeLinejoin="round"
        />
        <text>
          <tspan x="50%" y="50%" textAnchor="middle">
            {data * 100}%
          </tspan>
          <tspan x="50%" y="50%" textAnchor="middle" dy="20px">
            de votre
          </tspan>
          <tspan x="50%" y="50%" textAnchor="middle" dy="40px">
            objectif
          </tspan>
        </text>
      </svg>
    </div>
  )
}
