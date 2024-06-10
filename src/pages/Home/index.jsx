import NutriCards from '../../components/NutriCards'
import { useCurrentUser } from '../../hooks/useUser'

const Title = () => {
  const user = useCurrentUser()

  if (!user?.userInfos) return false

  return <h1>{`Bonjour ${user.userInfos.firstName}`}</h1>
}

const Home = () => {
  return (
    <main>
      <section>
        <Title />
        <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
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
