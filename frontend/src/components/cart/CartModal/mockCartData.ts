import { ICartItem, IProduct } from "../../../types";

export const DEFAULT_MOCK_CART_ITEMS: ICartItem[] = [
  {
    product: {
      id: "20-364-1",
      categoryId: "20",
      categoryName: "Новинки",
      name: "Ангус 4 Сыра",
      description:
        "Сочная мраморная говядина Абердин Ангус под нежным сырным соусом с четырьмя видами сыра на мягкой булочке бриошь.",
      dishId: "364",
      image:
        "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/group/74e6ddde00fbe9e8e554ba96a21592e5.png",
      price: 609.99,
      priceText: "609.99 ₽",
      sourceUrl: "https://burgerkingrus.ru/category/34",
    },
    quantity: 1,
  },
  {
    product: {
      id: "20-558-1",
      categoryId: "20",
      categoryName: "Бургеры",
      name: "Воппер",
      description:
        "Легендарный бургер с говядиной на огне, свежими томатами, хрустящим салатом и майонезом.",
      dishId: "558",
      image:
        "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/group/c4b08f2da6def7ff3a566fcb749d2dd0.png",
      price: 319.99,
      priceText: "319.99 ₽",
      sourceUrl: "https://burgerkingrus.ru/category/34",
    },
    quantity: 2,
  },
  {
    product: {
      id: "20-79-1",
      categoryId: "20",
      categoryName: "Роллы",
      name: "Воппер Ролл",
      description: "Все ингредиенты Воппера в теплой пшеничной тортилье.",
      dishId: "79",
      image:
        "https://orderapp-app-static.burgerkingrus.ru/x256/catalog/images/group/a37eda9cb7d598dbaeb774104f9d2db8.png",
      price: 369.99,
      priceText: "369.99 ₽",
      sourceUrl: "https://burgerkingrus.ru/category/34",
    },
    quantity: 1,
  },
];

export const MOCK_RECOMMENDED_PRODUCTS: IProduct[] = [
  {
    id: "rec-1",
    name: "Сырный соус",
    price: 49.99,
    image:
      "https://orderapp-app-static.burgerkingrus.ru/x128/catalog/category/911f592585fe94431b447af1082ce2b1.webp",
    categoryId: "60",
    categoryName: "Соусы",
    description: "Фирменный насыщенный сырный соус",
    dishId: "rec-1",
    priceText: "49.99 ₽",
    sourceUrl: "",
  },
  {
    id: "rec-2",
    name: "Кинг Фри Джуниор",
    price: 99.99,
    image:
      "https://orderapp-app-static.burgerkingrus.ru/x128/catalog/category/ca0273a722b8207a57201790a9d34a91.png",
    categoryId: "50",
    categoryName: "Закуски",
     description: "Хрустящий золотистый картофель фри",
    dishId: "rec-2",
    priceText: "99.99 ₽",
    sourceUrl: "",
  },
  {
    id: "rec-3",
    name: "Добрый Кола 0.5л",
    price: 139.99,
    image:
      "https://orderapp-app-static.burgerkingrus.ru/x128/catalog/category/efee0b6117146c1d6a942642fcfe0194.png",
    categoryId: "33",
    categoryName: "Напитки",
    description: "Освежающий газированный напитоҺ",
    dishId: "rec-3",
    priceText: "139.99 ₽",
    sourceUrl: "",
  },
];
