import { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
        </Routes>
    </div>
  )
}

export default App
