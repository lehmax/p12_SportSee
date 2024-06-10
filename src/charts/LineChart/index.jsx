import { useRef } from 'react'

const LineChart = () => {
  const ref = useRef()

  return <svg ref={ref} />
}

export default LineChart
