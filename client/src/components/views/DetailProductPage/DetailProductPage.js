import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { PRODUCT_SERVER, USER_SERVER } from '../../Config'

function DetailProductPage(props) {
    const { productId } = props.match.params

    const [Product, setProduct] = useState({})

    useEffect(() => {
        // 컴포넌트가 화면에 나타남
        axios.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
            .then((response) => {
                setProduct(response.data[0])
            })
            .catch((err) => alert(err))
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
