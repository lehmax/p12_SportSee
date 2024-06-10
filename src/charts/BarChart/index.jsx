import { useRef } from 'react'

const BarChart = () => {
  const ref = useRef()

  return <svg ref={ref} />
}

export default BarChart
