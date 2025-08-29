import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("Todas");

  const technologies = [
    "Todas", "React", "JavaScript", "Python", "Node.js", "TypeScript", 
    "Vue.js", "Angular", "PHP", "Java", "C#", "Go"
  ];

  const courses = [
    {
      id: 1,
      title: "React Desde Cero hasta Experto",
      description: "Aprende React desde los fundamentos hasta conceptos avanzados con proyectos prácticos",
      technology: "React",
      duration: "40 horas",
      students: 1250,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Python para Data Science",
      description: "Domina Python aplicado a ciencia de datos con pandas, numpy y matplotlib",
      technology: "Python",
      duration: "35 horas",
      students: 890,
      rating: 4.7,
    },
    {
      id: 3,
      title: "JavaScript Moderno ES6+",
      description: "Aprende las características modernas de JavaScript y mejores prácticas",
      technology: "JavaScript",
      duration: "28 horas",
      students: 2100,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Node.js y Express API REST",
      description: "Construye APIs robustas con Node.js, Express y bases de datos",
      technology: "Node.js",
      duration: "45 horas",
      students: 756,
      rating: 4.6,
    },
    {
      id: 5,
      title: "TypeScript para Desarrollo Frontend",
      description: "Mejora tu código JavaScript con TypeScript y tipado estático",
      technology: "TypeScript",
      duration: "25 horas",
      students: 623,
      rating: 4.8,
    },
    {
      id: 6,
      title: "Vue.js 3 Composition API",
      description: "Construye aplicaciones modernas con Vue.js 3 y su nueva API",
      technology: "Vue.js",
      duration: "32 horas",
      students: 445,
      rating: 4.7,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech === "Todas" || course.technology === selectedTech;
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Biblioteca de Cursos</h1>
          <p className="text-xl text-muted-foreground">
            Explora nuestra colección de cursos organizados por tecnología
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Technology Filter */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Tecnología:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedTech(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            {selectedTech !== "Todas" && ` en ${selectedTech}`}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              technology={course.technology}
              duration={course.duration}
              students={course.students}
              rating={course.rating}
              onView={() => console.log(`Ver curso: ${course.title}`)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron cursos</h3>
            <p className="text-muted-foreground mb-6">
              Intenta ajustar los filtros o términos de búsqueda
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedTech("Todas");
            }}>
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;