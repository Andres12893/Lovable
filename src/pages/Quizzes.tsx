import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Edit, Trash2, Plus, Users, Clock, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const Quizzes = () => {
  const navigate = useNavigate();
  
  const quizzes = [
    {
      id: 1,
      title: "Fundamentos de React",
      course: "React desde Cero hasta Experto",
      technology: "React",
      questions: 15,
      duration: "20 min",
      completions: 89,
      averageScore: 85,
      difficulty: "Principiante",
      status: "Activo"
    },
    {
      id: 2,
      title: "Hooks Avanzados",
      course: "React desde Cero hasta Experto", 
      technology: "React",
      questions: 12,
      duration: "15 min",
      completions: 67,
      averageScore: 72,
      difficulty: "Intermedio",
      status: "Activo"
    },
    {
      id: 3,
      title: "Python Básico - Variables y Tipos",
      course: "Python para Data Science",
      technology: "Python",
      questions: 20,
      duration: "25 min",
      completions: 156,
      averageScore: 91,
      difficulty: "Principiante",
      status: "Activo"
    },
    {
      id: 4,
      title: "Pandas y DataFrames",
      course: "Python para Data Science",
      technology: "Python",
      questions: 18,
      duration: "30 min",
      completions: 94,
      averageScore: 78,
      difficulty: "Intermedio",
      status: "Borrador"
    },
    {
      id: 5,
      title: "ES6+ Características Modernas",
      course: "JavaScript Moderno ES6+",
      technology: "JavaScript",
      questions: 16,
      duration: "18 min",
      completions: 203,
      averageScore: 88,
      difficulty: "Intermedio",
      status: "Activo"
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Borrador": return "bg-gray-100 text-gray-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Cuestionarios</h1>
            <p className="text-xl text-muted-foreground">
              Gestiona y analiza los cuestionarios de tus cursos
            </p>
          </div>
          <Button onClick={() => navigate("/create-quiz")} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Cuestionario
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{quizzes.length}</p>
                  <p className="text-muted-foreground text-sm">Total Cuestionarios</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {quizzes.reduce((sum, quiz) => sum + quiz.completions, 0)}
                  </p>
                  <p className="text-muted-foreground text-sm">Completaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(quizzes.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizzes.length)}%
                  </p>
                  <p className="text-muted-foreground text-sm">Puntuación Promedio</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {quizzes.filter(q => q.status === "Activo").length}
                  </p>
                  <p className="text-muted-foreground text-sm">Activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes List */}
        <div className="space-y-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{quiz.title}</CardTitle>
                      <Badge variant="outline">{quiz.technology}</Badge>
                      <Badge className={getDifficultyColor(quiz.difficulty)} variant="secondary">
                        {quiz.difficulty}
                      </Badge>
                      <Badge className={getStatusColor(quiz.status)} variant="secondary">
                        {quiz.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">Curso: {quiz.course}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Previsualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BarChart3 className="h-4 w-4" />
                      Preguntas
                    </div>
                    <p className="text-2xl font-semibold">{quiz.questions}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Duración
                    </div>
                    <p className="text-2xl font-semibold">{quiz.duration}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Completaciones
                    </div>
                    <p className="text-2xl font-semibold">{quiz.completions}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Puntuación Promedio
                      </div>
                      <span>{quiz.averageScore}%</span>
                    </div>
                    <Progress value={quiz.averageScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for when no quizzes exist */}
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay cuestionarios aún</h3>
            <p className="text-muted-foreground mb-6">
              Crea tu primer cuestionario para comenzar a evaluar a tus estudiantes
            </p>
            <Button onClick={() => navigate("/create-quiz")}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Cuestionario
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;