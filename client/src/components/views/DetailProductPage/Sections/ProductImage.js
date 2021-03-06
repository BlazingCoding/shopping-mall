import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { SERVER_PATH } from '../../../Config'

function ProductImage(props) {
    // gm npm으로 썸네일 만들면 된다.

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            const images = []
            props.detail.images.map((item) => {
                images.push({
                    original: `${SERVER_PATH}/${item}`,
                    thumbnail: `${SERVER_PATH}/${item}`,
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
