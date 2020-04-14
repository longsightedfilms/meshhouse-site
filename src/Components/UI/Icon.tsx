import React from 'react'

interface Icon extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement> ,HTMLImageElement> {
  icon: string
}

export default function (props: Icon) {
  const path = '/assets/icons/'
  const {icon, ...elementProps} = props

  return (
    <img
      className="icon"
      src={`${process.env.PUBLIC_URL}${path}${icon}.svg`}
      alt=''
      {...elementProps}
    />
  )
}
