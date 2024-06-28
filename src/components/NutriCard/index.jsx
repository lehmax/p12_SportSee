import IconCalorie from '../../assets/calorie.svg?react'
import IconCarb from '../../assets/carb.svg?react'
import IconLipid from '../../assets/lipid.svg?react'
import IconProtein from '../../assets/protein.svg?react'

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

/**
 * NutriCard component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The card ID.
 * @param {number} props.value - The card value.
 * @returns {JSX.Element} The NutriCard component.
 */
const NutriCard = ({ id, value }) => {
  const { icon, type, color, unit } = NUTRI_CONF[id]

  return (
    <div className="flex items-center gap-6 p-8 rounded-md bg-greyLight">
      <div
        className={`${color} flex p-4 w-[60px] h-[60px] justify-center items-center rounded-md shrink-0`}
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

export default NutriCard
