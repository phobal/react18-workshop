
// const Children: React.FC = () => {
//   return <>ddd</>
// }

const Children: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

const Parent = () => {
  return <Children>children</Children>
}

export default Children