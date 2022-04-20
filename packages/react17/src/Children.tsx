import React from 'react'

const Children: React.FC = ({ children }) => {
  return <>{children}</>
}

const Parent = () => {
  return <Children>ddd</Children>
}

export default Children