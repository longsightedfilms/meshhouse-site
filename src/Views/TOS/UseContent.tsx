import React from 'react'
import { Translate } from "react-localize-redux"

const UseContent = () => {
  return (
    <React.Fragment>
      <h2><Translate id="pages.tos.useContentTitle" /></h2>
      <hr className="mb-2" />
      <p>Content downloaded may be used for personal and commercial use (provided the use is in compliance with these terms and conditions).</p>
      <p>You are permitted to:</p>
      <ul>
        <li>use Content in 2D or 3D computer graphics, website design, advertising banners, movies, television shows and printed media</li>
        <li>incorporate the Content in computer games and 3D scenes</li>
        <li>for scrapbooking work, but only if you are the end-user of the work. Resale of the Content as scrapbooking packs, scrapbooking papers, templates, etc, is explicitly forbidden (even when the Content is modified)</li>
      </ul>
      <p>You are <b>not</b> permitted to:</p>
      <ul>
        <li>sell or distribute any model (modified or not) by themselves or in a model pack, asset pack(such as Unity or Unreal Engine), scrapbooking pack</li>
        <li>use Content in graphic design themes or templates sold to multiple customers on digital marketplaces (this includes stock photography, clipart, templates for websites, business cards and e-cards)</li>
        <li>use Content for creating products sold via 'print on demand' websites (for example print on demand mugs, T-shirts, mouse mats, etc)</li>
        <li>sell or distribute skins for laptops, phones and other devices created with Content from the Website</li>
        <li>use the Content to print wallpaper, fabrics or vinyl wraps (with the exception of private or one-off use)</li>
        <li>bundle Content with software such as paint programs, plugins, 3D engines, 3D programs or photo-kiosk software</li>
        <li>release the Content or derivative products with Content under Open Source Licences</li>
        <li>use Content in Second Life, Sansar or any other Linden Lab product or service</li>
        <li>use Content for any purpose that violates Russian or other applicable law or regulation</li>
        <li>use a program (spider, leecher) or script to automatically download (all) Content on the Website</li>
        <li>interfere with the security or otherwise abuse, disrupt, place excessive loads on, or attempt to gain unauthorised access to the Website or any system resources or networks connected to this website</li>
      </ul>
    </React.Fragment>
  )
}

export default UseContent