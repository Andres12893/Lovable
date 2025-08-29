import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Eye, Search, TrendingUp, Package, Euro, BarChart3 } from "lucide-react";
import { useState } from "react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const inventoryItems = [
    {
      id: 1,
      name: "Lightning Bolt",
      set: "Wilds of Eldraine",
      rarity: "Common",
      condition: "Near Mint",
      language: "EN",
      price: 2.50,
      quantity: 45,
      sold: 23,
      views: 156,
      status: "Activo",
      marketPrice: 2.45,
    },
    {
      id: 2,
      name: "Teferi, Master of Time",
      set: "The Lost Caverns of Ixalan",
      rarity: "Mythic",
      condition: "Near Mint",
      language: "EN",
      price: 35.99,
      quantity: 3,
      sold: 1,
      views: 89,
      status: "Activo",
      marketPrice: 33.50,
    },
    {
      id: 3,
      name: "Counterspell",
      set: "Murders at Karlov Manor",
      rarity: "Uncommon",
      condition: "Lightly Played",
      language: "EN",
      price: 1.25,
      quantity: 28,
      sold: 12,
      views: 234,
      status: "Pausado",
      marketPrice: 1.45,
    },
    {
      id: 4,
      name: "Serra Angel",
      set: "Outlaws of Thunder Junction",
      rarity: "Uncommon",
      condition: "Near Mint",
      language: "ES",
      price: 0.75,
      quantity: 156,
      sold: 89,
      views: 445,
      status: "Activo",
      marketPrice: 0.85,
    },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSold = inventoryItems.reduce((sum, item) => sum + item.sold, 0);
  const totalViews = inventoryItems.reduce((sum, item) => sum + item.views, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800";
      case "Uncommon": return "bg-green-100 text-green-800";
      case "Rare": return "bg-blue-100 text-blue-800";
      case "Mythic": return "bg-gradient-rare text-white";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo": return "bg-green-100 text-green-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      case "Agotado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriceComparison = (myPrice: number, marketPrice: number) => {
    const diff = ((myPrice - marketPrice) / marketPrice) * 100;
    if (diff > 5) return { color: "text-red-600", text: `+${diff.toFixed(1)}%` };
    if (diff < -5) return { color: "text-green-600", text: `${diff.toFixed(1)}%` };
    return { color: "text-gray-600", text: "≈ Mercado" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Mi Inventario</h1>
          <p className="text-xl text-muted-foreground">
            Gestiona tus cartas en venta y monitorea el rendimiento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Euro className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">€{totalValue.toFixed(2)}</p>
                  <p className="text-muted-foreground text-sm">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inventoryItems.length}</p>
                  <p className="text-muted-foreground text-sm">Productos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalSold}</p>
                  <p className="text-muted-foreground text-sm">Vendidas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalViews}</p>
                  <p className="text-muted-foreground text-sm">Visualizaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en tu inventario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="activo">Activo</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
              <SelectItem value="agotado">Agotado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Cartas en Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const priceComparison = getPriceComparison(item.price, item.marketPrice);
                const sellRate = item.quantity > 0 ? (item.sold / (item.sold + item.quantity)) * 100 : 0;
                
                return (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-card transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge className={getRarityColor(item.rarity)} variant="outline">
                            {item.rarity}
                          </Badge>
                          <Badge className={getStatusColor(item.status)} variant="secondary">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.set} • {item.condition} • {item.language}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
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
                    
                    <div className="grid md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Precio:</span>
                        <p className="font-semibold text-lg">€{item.price}</p>
                        <p className={`text-xs ${priceComparison.color}`}>
                          {priceComparison.text}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Stock:</span>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Vendidas:</span>
                        <p className="font-semibold text-green-600">{item.sold}</p>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Vistas:</span>
                        <p className="font-semibold">{item.views}</p>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Tasa de Venta:</span>
                        <div className="space-y-1">
                          <Progress value={sellRate} className="h-2" />
                          <p className="font-semibold text-xs">{sellRate.toFixed(1)}%</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Ingresos:</span>
                        <p className="font-semibold">€{(item.price * item.sold).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No hay cartas en tu inventario</h3>
                <p className="text-muted-foreground mb-6">
                  Comienza añadiendo cartas para vender
                </p>
                <Button>
                  Añadir Primera Carta
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;