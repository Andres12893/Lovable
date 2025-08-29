import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart, TrendingUp, Users } from "lucide-react";

interface CardItemProps {
  name: string;
  set: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Mythic";
  condition: string;
  language: string;
  price: number;
  seller: string;
  sellerRating: number;
  stock: number;
  image?: string;
  onAddToCart?: () => void;
  onAddToWishlist?: () => void;
}

const CardItem = ({
  name,
  set,
  rarity,
  condition,
  language,
  price,
  seller,
  sellerRating,
  stock,
  image,
  onAddToCart,
  onAddToWishlist,
}: CardItemProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Uncommon": return "bg-green-100 text-green-800 border-green-200";
      case "Rare": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Mythic": return "bg-gradient-rare text-white border-yellow-300";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Near Mint": return "text-green-600";
      case "Lightly Played": return "text-blue-600";
      case "Moderately Played": return "text-yellow-600";
      case "Heavily Played": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Card Image */}
          <div className="w-20 h-28 bg-gradient-secondary rounded-lg overflow-hidden flex-shrink-0">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-center p-2 font-medium">
                  {name.slice(0, 15)}...
                </span>
              </div>
            )}
          </div>

          {/* Card Details */}
          <div className="flex-1 min-w-0">
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground">{set}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getRarityColor(rarity)} variant="outline">
                  {rarity}
                </Badge>
                <Badge variant="secondary">{language}</Badge>
              </div>

              <div className="text-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Condición:</span>
                  <span className={`font-medium ${getConditionColor(condition)}`}>
                    {condition}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="font-medium">{stock} disponibles</span>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{seller}</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">{sellerRating}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="text-right space-y-2">
            <div className="text-2xl font-bold text-primary">
              €{price.toFixed(2)}
            </div>
            <div className="space-y-1">
              <Button
                size="sm"
                onClick={onAddToCart}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Comprar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onAddToWishlist}
                className="w-full"
              >
                <Heart className="h-4 w-4 mr-1" />
                Lista
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardItem;