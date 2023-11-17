import { useStore } from '../../store'

function Hero() {
  const { user } = useStore();

  return (
    <>
      <h1>Hero Section</h1>

    </>
  )
}

export default Hero