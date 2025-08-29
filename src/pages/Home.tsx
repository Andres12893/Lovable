import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Users, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Book,
      title: "Gestión de Cursos",
      description: "Organiza y administra tus cursos por tecnologías de forma sencilla",
    },
    {
      icon: Users,
      title: "Cuestionarios Interactivos", 
      description: "Crea evaluaciones personalizadas para medir el progreso",
    },
    {
      icon: Award,
      title: "Seguimiento de Progreso",
      description: "Monitorea el avance y rendimiento de cada estudiante",
    },
    {
      icon: TrendingUp,
      title: "Analytics Avanzados",
      description: "Obtén insights detallados sobre el rendimiento de tus cursos",
    },
  ];

  const stats = [
    { number: "500+", label: "Cursos Creados" },
    { number: "10K+", label: "Estudiantes Activos" },
    { number: "25+", label: "Tecnologías" },
    { number: "95%", label: "Satisfacción" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transforma el 
                <span className="block text-white/90">
                  Aprendizaje Tech
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Crea, gestiona y evalúa cursos de tecnología con nuestra plataforma integral. 
                Organiza contenido por tecnologías y mide el progreso con cuestionarios avanzados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/courses")}
                  className="font-semibold"
                >
                  Ver Cursos
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/create-course")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Crear Curso
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Educación tecnológica" 
                className="rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Todo lo que necesitas para enseñar tecnología
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas completas para crear experiencias de aprendizaje excepcionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-secondary flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de educadores que ya están transformando la forma de enseñar tecnología
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/create-course")}
            className="font-semibold"
          >
            Crear tu Primer Curso
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;