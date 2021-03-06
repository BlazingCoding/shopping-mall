import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../hoc/auth'
// nav, footer
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
// pages for this product
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import UploadProductPage from './views/UploadProductPage/UploadProductPage'
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
import CartPage from './views/CartPage/CartPage'
import HistoryPage from './views/HistoryPage/HistoryPage'

// Auth(Page, null)
// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            {/* NAV */}
            <NavBar />

            {/* Pages */}
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route exact path="/login" component={Auth(LoginPage, false)} />
                    <Route exact path="/register" component={Auth(RegisterPage, false)} />
                    <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
                    {/* productId는 다 다르기 때문에 다이나믹하게 바뀐다는 것을 : 로 표시해준댜. */}
                    <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} /> {/* null은 아무나. */}
                    <Route exact path="/user/cart" component={Auth(CartPage, true)} /> {/* true는 로그인 한 사람만 들어올 수 있음 */}
                    <Route exact path="/history" component={Auth(HistoryPage, true)} />
                </Switch>
            </div>

            {/* FOOTER */}
            <Footer />
        </Suspense>
    )
}

export default App
