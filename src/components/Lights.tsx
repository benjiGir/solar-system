function Lights(): JSX.Element {
  return (
    <>
      <ambientLight intensity={.5} color={0xaaaaaa}/>
      <pointLight position={[0, 0, 0]} intensity={2.5} color={0xffdcb4} />
    </>
  )
}

export default Lights
