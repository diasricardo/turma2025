import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function Home(){
  return(
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>Home</h1>
      <Link to="/sobre" className='rounded-lg bg-indigo-500 px-4 py-2 text-white'>Sobre</Link>
    </div>
  )
}

export default function App(){
  return(
    <BrowserRouter>
      <div className='flex min-h-screen items-center justify-center bg-slate-950'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/sobre' element={<Sobre />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}