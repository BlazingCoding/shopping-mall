import React, {useState} from 'react';
import {Typography, Button, Form, Input} from "antd";
import FileUpload from "../../utils/FileUpload";

// const { Title } = Typography;
const { TextArea } = Input

const Continents = [
    {key:1, value:"Africa"},
    {key:2, value:"Europe"},
    {key:3, value:"Asia"},
    {key:4, value:"North America"},
    {key:5, value:"South America"},
    {key:6, value:"Australia"},
    {key:7, value:"Antarctica"}
]

function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([]);

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

    return (
        <div style={{ maxWidth: "700px", margin: "2rem auto"}}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                {/*<Title level={2}>여행 상품 업로드</Title>*/}
                <h2>여행 상품 업로드</h2>
            </div>
            <Form action="">

                {/* DropZone*/}

                <FileUpload/>

                <br/>
                <br/>
                <label htmlFor="">이름</label>
                <Input onChange={titleChangeHandler} type="text" value={Title}/>
                <br/>
                <br/>
                <label htmlFor="">설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label htmlFor="">가격($)</label>
                <Input type="text" onChange={priceChangeHandler} value={Price}/>
                <br/>
                <br/>
                <select name="" id="" onChange={continentChangeHandler}>
                    {Continents.map(item => (
                        <option key={item.key} value={Continent}>{item.value}</option>
                    ))}

                </select>
                <br/>
                <br/>
                <Button>
                    확인
                </Button>
            </Form>
        </div>
    );
}

export default UploadProductPage;