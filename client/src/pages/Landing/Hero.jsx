import { useStoreContext } from '../../utils/store'

function Hero() {
  const [state, dispatch] = useStoreContext();

  const { user } = state

  return (
    <>
      <h1>Hero Section</h1>

    </>
  )
}

export default Hero