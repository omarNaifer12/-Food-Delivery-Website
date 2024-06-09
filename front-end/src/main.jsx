import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './index.jsx'

import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/StoreContex.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter >
 <StoreContextProvider>
 <Index />
 </StoreContextProvider>
   
    </ BrowserRouter >

)
