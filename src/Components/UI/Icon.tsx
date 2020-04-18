import React from 'react'

interface Icon extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement> ,HTMLImageElement> {
  icon: string
}

export default function (props: Icon) {
  const path = '/assets/icons/'
  const {icon, className, ...elementProps} = props

  const fullClass = `icon ${className}`

  return (
    <img
      className={fullClass}
      src={`${process.env.PUBLIC_URL}${path}${icon}.svg`}
      alt=''
      {...elementProps}
    />
  )
}
