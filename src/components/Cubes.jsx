import { useStore } from "../hooks/useStore";
import MyCube from "./Cube.jsx";
 
const Cubes = () => {
  const [cubes] = useStore(state => [state.cubes])

  return cubes.map(({id, position, texture}) => {
    return <MyCube
      key={id}
      id={id}
      position={position}
      texture={texture}
    />
  })
}
 
export default Cubes;