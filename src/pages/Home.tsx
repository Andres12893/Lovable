import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Search, TrendingUp, Shield, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/card-marketplace-hero.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description: "Encuentra cartas específicas con filtros detallados por set, rareza y condición",
    },
    {
      icon: TrendingUp,
      title: "Precios de Mercado", 
      description: "Accede a precios actualizados y tendencias del mercado en tiempo real",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Protección total del comprador con garantía de calidad y envío seguro",
    },
    {
      icon: Users,
      title: "Vendedores Verificados",
      description: "Red de vendedores profesionales con sistemas de calificación transparentes",
    },
  ];

  const popularSets = [
    { name: "Wilds of Eldraine", cards: "271 cartas", trend: "+15%" },
    { name: "The Lost Caverns of Ixalan", cards: "286 cartas", trend: "+8%" },
    { name: "Murders at Karlov Manor", cards: "274 cartas", trend: "+12%" },
    { name: "Outlaws of Thunder Junction", cards: "267 cartas", trend: "+5%" },
  ];

  const stats = [
    { number: "2.5M+", label: "Cartas en Stock" },
    { number: "50K+", label: "Usuarios Activos" },
    { number: "15K+", label: "Vendedores" },
    { number: "99.8%", label: "Satisfacción" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                El Mercado 
                <span className="block text-white/90">
                  de Cartas Líder
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Compra y vende cartas coleccionables con confianza. 
                Accede a millones de cartas, precios competitivos y vendedores verificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/marketplace")}
                  className="font-semibold"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Explorar Marketplace
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/sell")}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Vender Cartas
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Marketplace de cartas" 
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

      {/* Popular Sets */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Sets Más Populares</h2>
            <p className="text-xl text-muted-foreground">
              Descubre las colecciones más buscadas del momento
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSets.map((set, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-secondary flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {set.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {set.cards}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">{set.trend}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              ¿Por qué elegir CardMarket Pro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La plataforma más completa y segura para coleccionistas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
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

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <Star className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Únete a la Comunidad
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Recibe alertas de precios, novedades de sets y ofertas exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button 
                variant="secondary"
                className="font-semibold"
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;