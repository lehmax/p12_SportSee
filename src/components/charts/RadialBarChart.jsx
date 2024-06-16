export const RadialBarChart = ({ data, title = '' }) => {
  console.log('data', data)

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-blueLight aspect-square">
      {title !== '' && (
        <span className="absolute text-white opacity-50 top-10 left-10 max-w-40">
          {title}
        </span>
      )}
      <svg width="100%" height="100%" />
    </div>
  )
}
