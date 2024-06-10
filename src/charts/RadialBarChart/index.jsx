import { useEffect, useRef } from 'react'
import { createChart } from '../../utils/Chart'

const RadialBarChart = ({ data }) => {
  const ref = useRef()

  useEffect(() => {
    createChart(ref.current, data)
  }, [data])

  return <svg ref={ref} />
}

export default RadialBarChart
