import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { OptimismGoerli } from "@thirdweb-dev/chains";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Instructions from './pages/Instructions.jsx'
import { ContextProvider } from './context/GlobalContext.jsx';
import WorldInfo from './pages/WorldInfo.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
        <ThirdwebProvider activeChain={OptimismGoerli} clientId={"63c5aba3bfb867b8d3825cd874d39989"}>
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>
                        <Route path="/bls-world" element={<WorldInfo/>}/>
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </ThirdwebProvider>
)
