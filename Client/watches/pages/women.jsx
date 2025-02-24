import React from 'react'
import Grid from '../Components/grid'
import './MenWomen.css'

const women = () => {
    return (
        <div>
            <div className='loginPage'>
                <Grid isTitle={" "} gender="Women" showFilter={false} />
            </div>
        </div>
    )
}

export default women
