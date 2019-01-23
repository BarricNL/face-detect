import React from 'react'
import './FaceRecognition.css'
import emoji from './emoji.png'

const FaceRecognition = ({imageUrl, box}) => {
    const display = (imageUrl === '')? 'none': 'block';
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} width='500px' height='auto' alt=""/>
                <div className='bounding-box' style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol}}>
                <img id='img' src={emoji} alt="" style={{display:{display}}}/>
                </div>
                
            </div>
        </div>
    )

}

export default FaceRecognition