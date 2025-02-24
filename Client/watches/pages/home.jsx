import React from 'react'
import Grid from '../Components/grid'
import './home.css'
import HeroBanner from '../src/assets/Images/hero-banner-image.jpg'

const home = () => {

    return (
        <>
            <div className='hero-banner'>
                <img src={HeroBanner} alt="Hero-Banner" className='banner-image' />
            </div>
            <button className='hero-button'>Learn More</button>

            <div>
                <Grid limit={4} isTitle={"Recommended For You"} showFilter={false} showTypeF={false} />
            </div>

            <div className='category'  >
                <div className='Digital watchType'>
                    <h1>Digital</h1>
                </div>
                <div className='Analog watchType'>
                    <h1>Analog</h1>
                </div>
            </div>
        </>
    )
}

export default home
