import React, { useEffect } from 'react'

const Error = () => {
  useEffect(() => {
    const resizeHandle = () => {
      console.log('resize')
    }
    window.addEventListener('resize', resizeHandle)
    return () => {
      window.removeEventListener('resize', resizeHandle)
    }
  })
  return undefined
}

export default Error