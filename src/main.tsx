
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { LeagueStateProvider } from "./hooks/league/LeagueStateContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LeagueStateProvider>
      <App />
    </LeagueStateProvider>
  </React.StrictMode>,
)
