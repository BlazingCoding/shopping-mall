import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import Axios from 'axios'
import FileUpload from '../../utils/FileUpload'
import { PRODUCT_SERVER, USER_SERVER } from '../../Config'

// const { Title } = Typography;
const { TextArea } = Input

const Continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' },
    { key: 7, value: 'Antarctica' },
]

function UploadProductPage(props) {
    console.log('UploadProductPage')
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value)
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }
    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value)
    }
    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value)
    }
    /* 자식 FileUpload 컴포넌트에서 이미지 정보를 받아옴 */
    /* FileUpload 태그에서 props로 메소드를 넘겨주는데 인자를 updateImages를 쓴다. */
    /* updateImages는 이미지를 저장한다. */
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        if (!Title || !Description || !Price || !Continent || !Images) {
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        // 서버에 채운 값들을 request로 보낸다
        const body = {
            // 로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent,
        }
        Axios.post(`${PRODUCT_SERVER}`, body)
            .then((response) => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {/* <Title level={2}>여행 상품 업로드</Title> */}
                <h2>여행 상품 업로드</h2>
            </div>
            <Form onSubmit={submitHandler}>

                {/* DropZone */}

                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label htmlFor="">이름</label>
                <Input onChange={titleChangeHandler} type="text" value={Title} />
                <br />
                <br />
                <label htmlFor="">설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label htmlFor="">가격($)</label>
                <Input type="text" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select name="" id="" onChange={continentChangeHandler}>
                    {Continents.map((item) => (
                        <option key={item.key} value={Continent}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                {/* Button인지 button인지 구분을 잘하자. 1시간 날림. */}
                <button type="submit">
                    확인
                </button>
            </Form>
        </div>
    )
}

export default UploadProductPage
