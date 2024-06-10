import IconCalorie from '../../assets/calorie.svg?react'
import IconCarb from '../../assets/carb.svg?react'
import IconLipid from '../../assets/lipid.svg?react'
import IconProtein from '../../assets/protein.svg?react'
import { useCurrentUser } from '../../hooks/useUser'

const NUTRI_CONF = {
  calorieCount: {
    icon: <IconCalorie />,
    type: 'Calories',
    unit: 'kCal',
    color: 'bg-redLight',
  },
  proteinCount: {
    icon: <IconProtein />,
    type: 'Proteines',
    unit: 'g',
    color: 'bg-blueLight',
  },
  carbohydrateCount: {
    icon: <IconCarb />,
    type: 'Glucides',
    unit: 'g',
    color: 'bg-yellowLight',
  },
  lipidCount: {
    icon: <IconLipid />,
    type: 'Lipides',
    unit: 'g',
    color: 'bg-magentaLight',
  },
}

const NutriCard = ({ id, value }) => {
  const { icon, type, color, unit } = NUTRI_CONF[id]

  return (
    <div className="flex items-center gap-6 p-8 bg-greyLight">
      <div
        className={`${color} flex p-4 w-[60px] h-[60px] justify-center items-center rounded-md`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <strong className="text-xl">
          {value}
          {unit}
        </strong>
        <small className="text-sm">{type}</small>
      </div>
    </div>
  )
}

const NutriCards = () => {
  const user = useCurrentUser()

  if (!user?.keyData) return false

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(user.keyData).map(([key, value]) => (
        <NutriCard id={key} key={key} value={value} />
      ))}
    </div>
  )
}

export default NutriCards
