import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Save, Plus, X } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const CreateCourse = () => {
  const { toast } = useToast();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    technology: "",
    duration: "",
    difficulty: "",
    prerequisites: "",
  });

  const [modules, setModules] = useState([
    { id: 1, title: "", description: "", duration: "" }
  ]);

  const technologies = [
    "React", "JavaScript", "Python", "Node.js", "TypeScript", 
    "Vue.js", "Angular", "PHP", "Java", "C#", "Go", "CSS", "HTML"
  ];

  const difficulties = ["Principiante", "Intermedio", "Avanzado"];

  const handleInputChange = (field: string, value: string) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const addModule = () => {
    const newModule = { 
      id: modules.length + 1, 
      title: "", 
      description: "", 
      duration: "" 
    };
    setModules([...modules, newModule]);
  };

  const removeModule = (id: number) => {
    if (modules.length > 1) {
      setModules(modules.filter(module => module.id !== id));
    }
  };

  const updateModule = (id: number, field: string, value: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, [field]: value } : module
    ));
  };

  const handleSaveCourse = () => {
    if (!courseData.title || !courseData.technology) {
      toast({
        title: "Error",
        description: "Por favor completa al menos el título y la tecnología",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Curso creado exitosamente!",
      description: `El curso "${courseData.title}" ha sido guardado`,
    });

    // Reset form
    setCourseData({
      title: "",
      description: "",
      technology: "",
      duration: "",
      difficulty: "",
      prerequisites: "",
    });
    setModules([{ id: 1, title: "", description: "", duration: "" }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Crear Nuevo Curso</h1>
            <p className="text-xl text-muted-foreground">
              Diseña un curso completo con módulos y contenido estructurado
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  Información Básica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Curso *</Label>
                    <Input
                      id="title"
                      placeholder="Ej: React desde Cero hasta Experto"
                      value={courseData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technology">Tecnología *</Label>
                    <Select value={courseData.technology} onValueChange={(value) => handleInputChange("technology", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una tecnología" />
                      </SelectTrigger>
                      <SelectContent>
                        {technologies.map((tech) => (
                          <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe qué aprenderán los estudiantes en este curso..."
                    value={courseData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración Estimada</Label>
                    <Input
                      id="duration"
                      placeholder="Ej: 40 horas"
                      value={courseData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Dificultad</Label>
                    <Select value={courseData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prerequisites">Prerrequisitos</Label>
                    <Input
                      id="prerequisites"
                      placeholder="Ej: HTML, CSS básico"
                      value={courseData.prerequisites}
                      onChange={(e) => handleInputChange("prerequisites", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  Módulos del Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Módulo {index + 1}</h4>
                      {modules.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeModule(module.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Título del Módulo</Label>
                          <Input
                            placeholder="Ej: Introducción a los Hooks"
                            value={module.title}
                            onChange={(e) => updateModule(module.id, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duración</Label>
                          <Input
                            placeholder="Ej: 3 horas"
                            value={module.duration}
                            onChange={(e) => updateModule(module.id, "duration", e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción del Módulo</Label>
                        <Textarea
                          placeholder="Describe el contenido de este módulo..."
                          value={module.description}
                          onChange={(e) => updateModule(module.id, "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addModule}
                  className="w-full border-dashed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Módulo
                </Button>
              </CardContent>
            </Card>

            {/* Content Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  Contenido del Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Subir Contenido</h3>
                  <p className="text-muted-foreground mb-4">
                    Arrastra archivos aquí o haz clic para seleccionar videos, documentos y materiales
                  </p>
                  <Button variant="outline">
                    Seleccionar Archivos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">
                Guardar como Borrador
              </Button>
              <Button onClick={handleSaveCourse} className="min-w-[200px]">
                <Save className="h-4 w-4 mr-2" />
                Publicar Curso
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;