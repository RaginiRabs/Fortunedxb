import { useState } from 'react'
import './App.css'
import Navigation from './utility/Navigation'
import { CustomThemeProvider } from './context/ThemeProvider'
function App() {

  return (
   <>
   <CustomThemeProvider>
    <Navigation />
   </CustomThemeProvider>
   
   </>
  )
}

export default App
