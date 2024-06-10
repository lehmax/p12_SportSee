import * as d3 from 'd3'

export const createChart = (element, percent) => {
  const text = percent * 100 + '%'

  const width = 260
  const height = 260
  const thickness = 30
  const duration = 750
  const foregroundColor = '#0a8'
  const backgroundColor = '#ccc'

  const radius = Math.min(width, height) / 2
  const color = d3.scaleOrdinal([foregroundColor, backgroundColor])

  const svg = d3.select(element)

  svg.attr('class', 'pie')
  svg.attr('width', width)
  svg.attr('height', height)

  const g = svg
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

  const arc = d3
    .arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius)

  const pie = d3.pie().sort(null)

  const path = g
    .selectAll('path')
    .data(pie([0, 1]))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
      return color(i)
    })
    .each(function (d) {
      this._current = d
    })

  path
    .data(pie([percent, 1 - percent]))
    .transition()
    .duration(duration)
    .attrTween('d', function (d) {
      const interpolate = d3.interpolate(this._current, d)
      this._current = interpolate(0)
      return function (t) {
        return arc(interpolate(t))
      }
    })

  g.append('text').attr('text-anchor', 'middle').attr('dy', '.35em').text(text)
}
