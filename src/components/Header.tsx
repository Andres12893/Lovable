import { Book, Plus, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { name: "Cursos", path: "/courses", icon: Book },
    { name: "Crear Curso", path: "/create-course", icon: Plus },
    { name: "Cuestionarios", path: "/quizzes", icon: BarChart3 },
    { name: "Configuración", path: "/settings", icon: Settings },
  ];

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SkillSuite
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;