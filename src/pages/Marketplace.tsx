import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SortDesc, Grid, List } from "lucide-react";
import CardItem from "@/components/CardItem";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSet, setSelectedSet] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const sets = [
    "Wilds of Eldraine", "The Lost Caverns of Ixalan", "Murders at Karlov Manor", 
    "Outlaws of Thunder Junction", "Bloomburrow", "Duskmourn"
  ];

  const rarities = ["Common", "Uncommon", "Rare", "Mythic"];
  const conditions = ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played"];
  const sortOptions = [
    { value: "relevance", label: "Relevancia" },
    { value: "price_low", label: "Precio: Menor a Mayor" },
    { value: "price_high", label: "Precio: Mayor a Menor" },
    { value: "name", label: "Nombre A-Z" },
    { value: "set", label: "Set" },
  ];

  const cards = [
    {
      id: 1,
      name: "Lightning Bolt",
      set: "Wilds of Eldraine",
      rarity: "Common" as const,
      condition: "Near Mint",
      language: "EN",
      price: 2.50,
      seller: "CardShop EU",
      sellerRating: 98,
      stock: 45,
    },
    {
      id: 2,
      name: "Teferi, Master of Time",
      set: "The Lost Caverns of Ixalan",
      rarity: "Mythic" as const,
      condition: "Near Mint",
      language: "EN",
      price: 35.99,
      seller: "Magic Central",
      sellerRating: 99,
      stock: 3,
    },
    {
      id: 3,
      name: "Counterspell",
      set: "Murders at Karlov Manor",
      rarity: "Uncommon" as const,
      condition: "Lightly Played",
      language: "EN",
      price: 1.25,
      seller: "Pro Cards",
      sellerRating: 96,
      stock: 28,
    },
    {
      id: 4,
      name: "Black Lotus",
      set: "Alpha",
      rarity: "Rare" as const,
      condition: "Moderately Played",
      language: "EN",
      price: 45000.00,
      seller: "Vintage Vault",
      sellerRating: 100,
      stock: 1,
    },
    {
      id: 5,
      name: "Serra Angel",
      set: "Outlaws of Thunder Junction",
      rarity: "Uncommon" as const,
      condition: "Near Mint",
      language: "ES",
      price: 0.75,
      seller: "CardShop EU",
      sellerRating: 98,
      stock: 156,
    },
    {
      id: 6,
      name: "Jace, the Mind Sculptor",
      set: "Bloomburrow",
      rarity: "Mythic" as const,
      condition: "Near Mint",
      language: "EN",
      price: 89.99,
      seller: "Elite Cards",
      sellerRating: 99,
      stock: 7,
    },
  ];

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSet = selectedSet === "all" || card.set === selectedSet;
    const matchesRarity = selectedRarity === "all" || card.rarity === selectedRarity;
    const matchesCondition = selectedCondition === "all" || card.condition === selectedCondition;
    const matchesPrice = card.price >= priceRange[0] && card.price <= priceRange[1];
    
    return matchesSearch && matchesSet && matchesRarity && matchesCondition && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price_low": return a.price - b.price;
      case "price_high": return b.price - a.price;
      case "name": return a.name.localeCompare(b.name);
      case "set": return a.set.localeCompare(b.set);
      default: return 0;
    }
  });

  const handleAddToCart = (cardName: string) => {
    toast({
      title: "Añadido al carrito",
      description: `${cardName} ha sido añadido a tu carrito`,
    });
  };

  const handleAddToWishlist = (cardName: string) => {
    toast({
      title: "Añadido a la lista de deseos",
      description: `${cardName} ha sido añadido a tu lista de deseos`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Encuentra las cartas que necesitas entre millones de opciones
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Set Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Set</label>
                  <Select value={selectedSet} onValueChange={setSelectedSet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos los sets" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los sets</SelectItem>
                      {sets.map((set) => (
                        <SelectItem key={set} value={set}>{set}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rarity Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rareza</label>
                  <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las rarezas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las rarezas</SelectItem>
                      {rarities.map((rarity) => (
                        <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Condición</label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las condiciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las condiciones</SelectItem>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Rango de Precio: €{priceRange[0]} - €{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={1}
                    className="w-full"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSet("all");
                    setSelectedRarity("all");
                    setSelectedCondition("all");
                    setPriceRange([0, 1000]);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cartas por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-r-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-l-none border-l"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredCards.length} carta{filteredCards.length !== 1 ? 's' : ''} encontrada{filteredCards.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Cards Grid/List */}
            <div className={viewMode === "grid" 
              ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredCards.map((card) => (
                <CardItem
                  key={card.id}
                  name={card.name}
                  set={card.set}
                  rarity={card.rarity}
                  condition={card.condition}
                  language={card.language}
                  price={card.price}
                  seller={card.seller}
                  sellerRating={card.sellerRating}
                  stock={card.stock}
                  onAddToCart={() => handleAddToCart(card.name)}
                  onAddToWishlist={() => handleAddToWishlist(card.name)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron cartas</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar los filtros o términos de búsqueda
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedSet("all");
                  setSelectedRarity("all");
                  setSelectedCondition("all");
                  setPriceRange([0, 1000]);
                }}>
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;