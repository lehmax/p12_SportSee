import { ENDPOINTS } from '../../config'

import NutriCard from '../../components/NutriCard'
import {
  BarChart,
  LineChart,
  RadarChart,
  RadialBarChart,
} from '../../components/charts'

import { useFetch } from '../../hooks/useFetch'
import { useCurrentUser } from '../../hooks/useUser'

const Title = () => {
  const user = useCurrentUser()

  if (!user?.userInfos) return false

  return (
    <h1 className="mb-5 text-5xl">
      <span>{'Bonjour '}</span>
      <strong className="text-red">{user.userInfos.firstName}</strong>
    </h1>
  )
}

const ActivityChart = () => {
  const { data, isError } = useFetch(ENDPOINTS.activity)

  if (!data?.sessions || isError) return false

  return <BarChart data={data.session} title="Score" />
}

const AverageSessionChart = () => {
  const { data, isError } = useFetch(ENDPOINTS.averageSession)

  if (!data?.sessions || isError) return false

  return <LineChart data={data.sessions} />
}

const PerformanceChart = () => {
  const { data, isError } = useFetch(ENDPOINTS.performance)

  if (!data || isError) return false

  return <RadarChart data={data} />
}

const ScoreChart = () => {
  const user = useCurrentUser()

  if (!user?.todayScore) return false

  return <RadialBarChart data={user.todayScore} />
}

const NutriCards = () => {
  const user = useCurrentUser()

  if (!user?.keyData) return false

  return (
    <div className="grid h-full gap-10">
      {Object.entries(user.keyData).map(([key, value]) => (
        <NutriCard id={key} key={key} value={value} />
      ))}
    </div>
  )
}

const Home = () => {
  return (
    <main>
      <section className="mb-12">
        <Title />
        <h2 className="text-lg">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </h2>
      </section>
      <section className="grid grid-cols-4 grid-rows-4 gap-8">
        <div className="col-span-3 row-span-2">
          <ActivityChart />
        </div>
        <div className="row-span-2">
          <AverageSessionChart />
        </div>
        <div className="row-span-2">
          <PerformanceChart />
        </div>
        <div className="row-span-2">
          <ScoreChart />
        </div>
        <div className="col-start-4 row-span-4 row-start-1">
          <NutriCards />
        </div>
      </section>
    </main>
  )
}

export default Home
