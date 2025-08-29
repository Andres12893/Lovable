import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Save, Plus, X, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Sell = () => {
  const { toast } = useToast();
  const [cardData, setCardData] = useState({
    name: "",
    set: "",
    rarity: "",
    condition: "",
    language: "EN",
    price: "",
    quantity: "1",
    description: "",
  });

  const sets = [
    "Wilds of Eldraine", "The Lost Caverns of Ixalan", "Murders at Karlov Manor", 
    "Outlaws of Thunder Junction", "Bloomburrow", "Duskmourn", "Alpha", "Beta"
  ];

  const rarities = ["Common", "Uncommon", "Rare", "Mythic"];
  const conditions = ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played"];
  const languages = ["EN", "ES", "FR", "DE", "IT", "PT", "JA"];

  const handleInputChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCard = () => {
    if (!cardData.name || !cardData.set || !cardData.price) {
      toast({
        title: "Error",
        description: "Por favor completa al menos el nombre, set y precio",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Carta añadida exitosamente!",
      description: `${cardData.name} ha sido añadida a tu inventario`,
    });

    // Reset form
    setCardData({
      name: "",
      set: "",
      rarity: "",
      condition: "",
      language: "EN",
      price: "",
      quantity: "1",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Vender Cartas</h1>
            <p className="text-xl text-muted-foreground">
              Añade cartas a tu inventario para vender en el marketplace
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Card Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  Información de la Carta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre de la Carta *</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Lightning Bolt"
                      value={cardData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="set">Set *</Label>
                    <Select value={cardData.set} onValueChange={(value) => handleInputChange("set", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un set" />
                      </SelectTrigger>
                      <SelectContent>
                        {sets.map((set) => (
                          <SelectItem key={set} value={set}>{set}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rarity">Rareza</Label>
                    <Select value={cardData.rarity} onValueChange={(value) => handleInputChange("rarity", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Rareza" />
                      </SelectTrigger>
                      <SelectContent>
                        {rarities.map((rarity) => (
                          <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condición</Label>
                    <Select value={cardData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Condición" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select value={cardData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Añade detalles adicionales sobre la condición, características especiales, etc."
                    value={cardData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Inventory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  Precio e Inventario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (€) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={cardData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="1"
                      value={cardData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                    />
                  </div>
                </div>

                {/* Market Price Info */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Precios de Referencia del Mercado</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Precio Promedio:</span>
                      <p className="font-semibold">€2.45</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Precio Mínimo:</span>
                      <p className="font-semibold text-green-600">€1.89</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Precio Máximo:</span>
                      <p className="font-semibold text-red-600">€3.25</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  Imágenes de la Carta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Subir Imágenes</h3>
                  <p className="text-muted-foreground mb-4">
                    Sube fotos claras de tu carta (frente y dorso recomendado)
                  </p>
                  <Button variant="outline">
                    Seleccionar Imágenes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline">
                Guardar como Borrador
              </Button>
              <Button onClick={handleSaveCard} className="min-w-[200px]">
                <Save className="h-4 w-4 mr-2" />
                Añadir al Inventario
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;