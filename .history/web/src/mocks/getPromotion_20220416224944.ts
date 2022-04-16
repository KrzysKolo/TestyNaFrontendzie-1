import { Promotion } from "../types/Promotion";

export const getPromotions = (): Promotion[] => [
  {
    id: "1",
    name: "Świąteczna promocja",
    description: "Świąteczna promocja 25% zniżki na wszystkie produkty!",
    discount: { code: "ŚWIĄTECZNA_PROMOCJA", percentage: 25 },
    dateStart: new Date("2021-12-10"),
    dateEnd: new Date("2021-12-31"),
  },

  {
    id: "2",
    name: "Całoroczna promocja",
    description: "Zamów z kodem rabatowym -10%",
    discount: { code: "ALE_RABAT", percentage: 10 },
    dateStart: new Date("2021-01-01"),
    dateEnd: new Date("2021-12-31"),
  },
  {
    id: "3",
    name: "Dzień dziecka",
    description:
      "Z okazji dnia dziecka mamy dla Ciebie kod rabatowy! Użyj kodu rabatowego i skorzystaj z -45% na wszystkie produkty!",
    discount: { code: "DZIEN_DZIECKA_2021", percentage: 45 },
    dateStart: new Date("2021-06-01"),
    dateEnd: new Date("2021-06-25 24:00"),
  },
];
