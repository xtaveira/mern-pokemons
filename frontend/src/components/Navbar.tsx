import { Switch } from "./ui/switch"

type ViewMode = 'pokemons' | 'tipos'

interface NavbarProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function Navbar({ viewMode, onViewModeChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">MERN Pokemons App</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Pokemons</span>
            <Switch 
              checked={viewMode === 'tipos'} 
              onCheckedChange={(checked) => onViewModeChange(checked ? 'tipos' : 'pokemons')}
            />
            <span className="text-sm font-medium">Tipos</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
