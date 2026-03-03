import React from 'react'
import ReactDOM from 'react-dom/client'
import { OptionsApp } from './OptionsApp'
import { initTheme } from './utils/themeUtils'
import './index.css'
import './options.css'

// Initialize theme before rendering
initTheme().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <OptionsApp />
        </React.StrictMode>,
    )
})
