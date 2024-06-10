import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons"

export const ACTIVITY_TYPES = [
  {
    title: "Translation & Interpretation",
    id: 0,
    icon: <MaterialIcons name="g-translate" size={24} color="black" />,
    slug: 'translation'
  },
  {
    title: "Pick up & Driving Tours",
    id: 1,
    icon: <MaterialIcons name="drive-eta" size={24} color="black" />,
    slug: 'driving'
  },
  {
    title: "Shopping",
    id: 2,
    icon: <AntDesign name="shoppingcart" size={24} color="black" />,
    slug: 'shopping',
  },
  {
    title: "Nightlife & Bars",
    id: 3,
    icon: <MaterialIcons name="nightlife" size={24} color="black" />,
    slug: 'nightlife'
  },
  {
    title: "Food & Restaurants",
    id: 4,
    icon: <Ionicons name="restaurant-outline" size={24} color="black" />,
    slug: 'food'
  },
  {
    title: "Art & Museums",
    id: 5,
    icon: <MaterialIcons name="museum" size={24} color="black" />,
    slug: 'museums'
  },
  {
    title: "Sports & Recreation",
    id: 6,
    icon: <MaterialIcons name="sports-tennis" size={24} color="black" />,
    slug: 'recreation'
  },
  {
    title: "History & Culture",
    id: 7,
    icon: <AntDesign name="book" size={24} color="black" />,
    slug: 'culture'
  },
  {
    title: "Exploration & Sightseeing",
    id: 8,
    icon: <MaterialIcons name="travel-explore" size={24} color="black" />,
    slug: 'sightseeing'
  },
]