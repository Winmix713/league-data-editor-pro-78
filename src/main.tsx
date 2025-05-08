
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { LeagueStateProvider } from "./hooks/league/LeagueStateContext"
import "./data/teams" // Import teams data to ensure it's loaded

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LeagueStateProvider>
        <App />
      </LeagueStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
