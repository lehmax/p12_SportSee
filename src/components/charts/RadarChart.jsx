import * as d3 from 'd3'
import { useMemo } from 'react'

const properties = data => {
  const labels = {
    intensity: 'Intensité',
    speed: 'Vitesse',
    strength: 'Force',
    endurance: 'Endurance',
    energy: 'Énergie',
    cardio: 'Cardio',
  }
  const levelsDiameter = [22.5, 45, 90, 135, 180]
  const values = data.data.map(d => d.value)
  const maxRadius = levelsDiameter[levelsDiameter.length - 1] / 2
  const length = 6 // Number of categories/points
  const angle = (2 * Math.PI) / length // 2 * Math.PI is a full circle

  const axis = levelsDiameter.map(diameter => {
    // Create the axis (level hexagons)
    const polygon = d3
      .lineRadial()
      .angle((_, i) => i * angle) // Returns the angle of the point on the hexagon
      .curve(d3.curveLinearClosed)
      .radius(() => diameter / 2)

    return polygon(Array.from({ length }))
  })

  const categories = Object.entries(data.kind)
    .reverse()
    .map(([key, value], i) => {
      const pointX = Math.cos(i * angle - Math.PI / 2) * (maxRadius + 28) //Returns the x coordinate of the point on the hexagon
      const pointY = Math.sin(i * angle - Math.PI / 2) * (maxRadius + 10) //Returns the y coordinate

      return {
        key,
        value: labels[value],
        x: pointX,
        y: pointY,
      }
    })

  const valuePolygon = d3
    .lineRadial()
    .angle((_, i) => i * angle)
    .curve(d3.curveLinearClosed)
    .radius(data => (data / Math.max(...values)) * maxRadius)

  const valuePath = valuePolygon(values.reverse())

  return {
    axis,
    categories,
    valuePath,
  }
}

/**
 * Radar chart component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data to display in the chart.
 * @returns {JSX.Element} The radar chart component.
 */
export const RadarChart = ({ data }) => {
  const { axis, categories, valuePath } = useMemo(() => properties(data), [])

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-blueDark2 aspect-square">
      <svg className="w-full h-full" viewBox="0 0 260 260">
        <g transform="translate(130, 130)">
          <g>
            {axis.map((path, index) => (
              <path
                key={index}
                d={path}
                fill="none"
                stroke="white"
                strokeWidth="1px"
              />
            ))}
          </g>

          <g>
            {categories.map((data, index) => (
              <text
                key={index}
                x={data.x}
                y={data.y}
                fill="white"
                fontSize="12px"
                textAnchor="middle"
              >
                {data.value}
              </text>
            ))}
          </g>

          <g>
            <path d={valuePath} fill="hsl(0deg 100% 50% / 0.7)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
