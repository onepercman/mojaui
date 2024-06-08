import { useTheme } from "next-themes"
import { LuMoon } from "react-icons/lu"
import { Button } from "./components"

export default function () {
  const { theme, setTheme } = useTheme()

  return (
    <div className="p-4">
      <div>
        <Button>Button</Button>
      </div>

      {/* Theme */}
      <Button
        leftIcon={<LuMoon />}
        className="fixed bottom-4 right-4"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  )
}
