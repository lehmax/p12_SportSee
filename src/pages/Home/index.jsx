import LineChart from '../../components/LineChart'
import NutriCards from '../../components/NutriCards'

import { useFetch } from '../../hooks/useFetch'
import { useCurrentUser } from '../../hooks/useUser'

const sessionEndpoint = `${import.meta.env.VITE_ENDPOINT}/average-sessions`

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

const AverageSessionChart = () => {
  const { data, isError } = useFetch(sessionEndpoint)

  if (!data?.sessions || isError) return false

  return <LineChart data={data.sessions} title="Durée moyenne des sessions" />
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
      <section className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-8 grid-rows-subgrid">
            <AverageSessionChart />
          </div>
        </div>
        <div className="grid gap-8">
          <NutriCards />
        </div>
      </section>
    </main>
  )
}

export default Home
