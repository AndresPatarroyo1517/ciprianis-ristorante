import { createRoot } from 'react-dom/client'
import { AppWrapper } from './App'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(<AppWrapper />)
