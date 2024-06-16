export const BarChart = ({ data, title = '' }) => {
  console.log('data', data)

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-greyLight">
      {title !== '' && (
        <span className="absolute text-white opacity-50 top-10 left-10 max-w-40">
          {title}
        </span>
      )}
      <svg className="w-full h-full" />
    </div>
  )
}
