import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
      Tailwind is working! 🎉
    </div>
  )
}

export default App
