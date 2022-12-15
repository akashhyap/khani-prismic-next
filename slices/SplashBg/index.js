import React from 'react'
import RichText from "../../components/RichText";
import { PrismicNextImage } from "@prismicio/next";


const SplashBg = ({ slice }) => (
  <section className='section relative bg-black'>
    <div className='absolute inset-0'>
      <PrismicNextImage field={slice?.primary?.image} layout='fill' objectFit='cover' priority="true"/>
      <div className='absolute inset-0 bg-black bg-opacity-60  mix-blend-multiply' />
    </div>
    <div className='container relative py-32'>
      <RichText field={slice.primary.title} className='splash_title text-white' />
    </div>
  </section>
)

export default SplashBg