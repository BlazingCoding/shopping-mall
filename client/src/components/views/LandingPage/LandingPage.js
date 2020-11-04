import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel} from 'antd'
import Meta from 'antd/lib/card/Meta'
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { continents, price } from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    });
    const [SearchTerm, setSearchTerm] = useState("");

    // 처음 들어올때 한번 getProducts로 product 정보가져옴
    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
       getProducts(body)
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore){
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    // 더보기 핸들러
    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            // skip: Skip, 여기에 Skip을 넣어 줌으로써 데이터가 중복으로 계속 추가되었다...
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }
        getProducts(body)
        setSkip(skip)
        console.log('Limit', Limit);
        console.log('Skip', Skip);
    }

    const renderCards = Products.map((product, index) => {
        console.log('product', product);
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<ImageSlider images={product.images}/>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = [];
        for (let key in data){
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array
    }
    // 체크박스, 라디오버튼 클릭했을때 필터적용
    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters}
        newFilters[category] = filters

        console.log('filters', filters);
        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (
        <div style={{width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="rocket"/> </h2>
            </div>

            {/* Filter */}
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    {/* continents는 Datas.js의 나라 객체 배열이다. _id와 나라 name이 객체를 이룬다. */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>


            {/* Search */}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br/>

            {PostSize >= Limit &&
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }

       </div>
    )
}

export default LandingPage
