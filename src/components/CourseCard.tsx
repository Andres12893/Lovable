import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  technology: string;
  duration: string;
  students: number;
  rating: number;
  image?: string;
  onView?: () => void;
}

const CourseCard = ({ 
  title, 
  description, 
  technology, 
  duration, 
  students, 
  rating, 
  image,
  onView 
}: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="aspect-video bg-gradient-secondary rounded-t-lg overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">{technology.charAt(0)}</span>
            </div>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="mb-2">
            {technology}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {rating}
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students} estudiantes
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6">
        <Button 
          className="w-full" 
          onClick={onView}
        >
          Ver Curso
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;