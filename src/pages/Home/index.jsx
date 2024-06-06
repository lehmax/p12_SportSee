import { useUser } from '../../hooks/useUser'

const Home = () => {
  const user = useUser()

  return (
    <main>
      {user ? <h1>{`Bonjour ${user.userInfos.firstName}`}</h1> : null}
      <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
    </main>
  )
}

export default Home
