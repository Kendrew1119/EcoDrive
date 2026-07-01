export type RoutePath = {
  id: "fast" | "eco";
  label: string;
  distanceKm: number;
  timeMins: number;
  carbonEmissionKg: number;
  carbonSavedKg: number;
  ecoCoinsBonus: number;
  color: string;
  points: [number, number][];
};

export const presetDestinations = [
  { id: "campus", label: "UTAR Kampar Campus" },
  { id: "home", label: "Home" },
  { id: "office", label: "Office" }
];

export const presetRoutes: Record<string, RoutePath[]> = {
  campus: [
    {
      id: "fast",
      label: "Route A (Fast)",
      distanceKm: 8.5,
      timeMins: 18,
      carbonEmissionKg: 2.1,
      carbonSavedKg: 0,
      ecoCoinsBonus: 0,
      color: "#FF5B5B", // Danger red
      points: [
        [4.331, 101.135],
        [4.334, 101.140],
        [4.335, 101.142],
        [4.338, 101.145],
        [4.339, 101.147]
      ]
    },
    {
      id: "eco",
      label: "Route B (Eco)",
      distanceKm: 9.2,
      timeMins: 20,
      carbonEmissionKg: 1.6,
      carbonSavedKg: 0.5,
      ecoCoinsBonus: 50,
      color: "#37E58F", // Eco green
      points: [
        [4.331, 101.135],
        [4.328, 101.142],
        [4.332, 101.148],
        [4.337, 101.150],
        [4.339, 101.147]
      ]
    }
  ]
};
