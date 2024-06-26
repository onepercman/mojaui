import { ThemeProvider } from "next-themes"
import Home from "./home"
import { VariantsProvider } from "./providers/variants-provider"
import "./styles/styles.scss"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <VariantsProvider>
        <Home />
      </VariantsProvider>
    </ThemeProvider>
  )
}
