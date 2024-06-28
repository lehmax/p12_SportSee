import { useNavigate } from 'react-router-dom'
import NutriCard from '../../components/NutriCard'
import {
  BarChart,
  LineChart,
  RadarChart,
  RadialBarChart,
} from '../../components/charts'

import { useFetch } from '../../hooks/useFetch'
import { useCurrentUser, useUserData } from '../../hooks/useUser'

const Title = ({ title }) => {
  return (
    <h1 className="mb-5 text-5xl">
      <span>{'Bonjour '}</span>
      <strong className="text-red">{title}</strong>
    </h1>
  )
}

const ActivityChart = () => {
  const { userEndpoints } = useCurrentUser()
  const { data, isError } = useFetch(userEndpoints?.activity)

  if (!data?.sessions || isError) return false

  return <BarChart data={data.sessions} title="Score" />
}

const AverageSessionChart = () => {
  const { userEndpoints } = useCurrentUser()
  const { data, isError } = useFetch(userEndpoints?.averageSession)

  if (!data?.sessions || isError) return false

  return <LineChart data={data.sessions} />
}

const PerformanceChart = () => {
  const { userEndpoints } = useCurrentUser()
  const { data, isError } = useFetch(userEndpoints?.performance)

  if (!data || isError) return false

  return <RadarChart data={data} />
}

const ScoreChart = ({ user }) => {
  let data = ''

  if (user?.todayScore) {
    data = user.todayScore
  } else if (user?.score) {
    data = user.score
  } else {
    return false
  }

  return <RadialBarChart data={data} />
}

const NutriCards = ({ user }) => {
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
  const { user } = useUserData()
  const navigate = useNavigate()

  if (!user) return navigate('/404')

  return (
    <main>
      <section className="mb-12">
        {user?.userInfos ? <Title title={user.userInfos?.firstName} /> : null}
        <h2 className="text-lg">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </h2>
      </section>
      <section className="grid grid-cols-4 gap-8">
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
          <ScoreChart user={user} />
        </div>
        <div className="col-start-4 row-span-4 row-start-1">
          <NutriCards user={user} />
        </div>
      </section>
    </main>
  )
}

export default Home
