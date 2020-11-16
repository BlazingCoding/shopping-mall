import React from 'react'
import { Carousel } from 'antd'
import { SERVER_PATH } from '../Config'

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img
                            style={{ width: '100%', maxHeight: '150px' }}
                            src={`${SERVER_PATH}/${image}`}
                            alt=""
                        />
                        {/* <img style={{width:'100%', maxHeight:'150px'}} */}
                        {/*     src={`http://localhost:5000/${image}`} alt=""/> */}
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
