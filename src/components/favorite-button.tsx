// import type { WeatherData } from "@/api/types"
// import { useFavorite } from "@/hooks/use-favorite";
// import { Button } from "./ui/button";
// import { Star } from "lucide-react";
// import { toast } from "sonner";
// interface FavoriteButtonProps{
//     data: WeatherData;
// }


// const FavoriteButton = ({ data }: FavoriteButtonProps  ) => {
//  const { addToFavorite, isFavorite, removeFavorite } = useFavorite();
//  const isCurrentlyFavorite = isFavorite(data.coor.lat, data.coor.lon);
 
//  const handleToggleFavorite = () =>{
//     if(isCurrentlyFavorite) {
//        removeFavorite.mutate(`${data.coor.lat} - ${data.coor.lon}`);
//        toast.error(`Removed ${data.name} from Favorites`)
//     }else{
//     addToFavorite.mutate({
//         name: data.name,
//         lat: data.coor.lat,
//         lon: data.coor.lon,
//         country: data.sys.country,
//     })
//            toast.success(`Added ${data.name} to Favorites`)

//     }
//  }
 
//     return (
//     <Button variant={isCurrentlyFavorite ? "default" : "outline"}
//             size={"icon"} 
//             className={isCurrentlyFavorite? "bg-yellow-500 hover:bg-yellow-600" : ""}
//             onClick={handleToggleFavorite}
//             >
//         <Star 
//         className= {`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
//     </Button>
//   )
// }

// export default FavoriteButton
// src/components/favorite-button.tsx
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addToFavorites, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addToFavorites.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
    >
      <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}