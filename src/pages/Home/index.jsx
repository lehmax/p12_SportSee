import NutriCards from '../../components/NutriCards'
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
        <div className="col-span-3" />
        <div className="grid gap-8 grid-cols-subgrid">
          <NutriCards />
        </div>
      </section>
    </main>
  )
}

export default Home
