import React from 'react'
import './UserCardBlock.css'
import { SERVER_PATH } from '../../../Config'

function UserCardBlock(props) {
    const renderCartImage = (images) => {
        if (images.length > 0) {
            const image = images[0]
            return `${SERVER_PATH}/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img src={renderCartImage(product.images)} alt="product" style={{ width: '70px' }} />
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    ${product.price}
                </td>
                <td>
                    <button type="button" onClick={() => props.removeItem(product._id)}>
                        Remove
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
