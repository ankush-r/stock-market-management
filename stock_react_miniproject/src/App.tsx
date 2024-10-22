import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Navigation } from './component/Navigation'
import { Provider } from 'react-redux'
import {  store } from './redux/Store'
import Dashboard from './component/projectDashboard/Dashboard'
import Summarizer from './component/bonusSummarizer/Summarizer'
import { StockMain } from './component/StockView/StockMain'
import MyPortfolio from './component/PortfolioPage/MyPortfolio'

function App() {
  return (
    <Provider store={store}>

    <BrowserRouter>
      <Navigation/>
      <Routes>

      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/summarizer' element={<Summarizer/>}></Route>
      <Route path='/myportfolio' element={<MyPortfolio/>}></Route>
      <Route path="/market/:stockName" element={<StockMain/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
