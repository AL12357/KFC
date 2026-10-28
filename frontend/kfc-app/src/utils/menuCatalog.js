import { getdata } from "./getdata";

export const getMenuImageForTitle = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (/biryani/.test(normalizedTitle)) return "/food/biryani-bucket.png";
  if (/roll/.test(normalizedTitle)) return "/food/chicken-roll.png";
  if (/burger|sandwich|zinger/.test(normalizedTitle)) {
    return "/food/chicken-sandwich.jpg";
  }
  if (/fries/.test(normalizedTitle)) return "/food/fries.jpg";
  if (/pepsi|7up|mirinda|cola|drink|beverage/.test(normalizedTitle)) {
    return "/food/cola.jpg";
  }
  if (/dessert|sweet/.test(normalizedTitle)) return "/food/dessert.jpg";
  if (/chicken|bucket|box meal|family/.test(normalizedTitle)) {
    return "/food/fried-chicken.jpg";
  }

  return null;
};

const fallbackMenuItems = [
  {
    _id: "sample-streetwise-2",
    image: "/food/fried-chicken.jpg",
    title: "Streetwise 2",
    desc: "Two pieces of chicken served with regular chips.",
    price: 17000,
    type: "chicken",
  },
  {
    _id: "sample-streetwise-5",
    image: "/food/fried-chicken.jpg",
    title: "Streetwise 5",
    desc: "Five pieces of chicken served with chips.",
    price: 35000,
    type: "chicken",
  },
  {
    _id: "sample-chicken-bucket",
    image: "/food/fried-chicken.jpg",
    title: "8 Piece Bucket",
    desc: "Eight pieces of chicken for sharing.",
    price: 60000,
    type: "chicken",
  },
  {
    _id: "sample-12-piece-bucket",
    image: "/food/fried-chicken.jpg",
    title: "12 Piece Bucket",
    desc: "A larger chicken bucket for sharing.",
    price: 85000,
    type: "stayhome",
  },
  {
    _id: "sample-zinger-burger",
    image: "/food/chicken-sandwich.jpg",
    title: "Zinger Burger",
    desc: "Spicy chicken fillet burger.",
    price: 18000,
    type: "burger",
  },
  {
    _id: "sample-crunch-wrap",
    image: "/food/chicken-roll.png",
    title: "Crunch Wrap",
    desc: "Chicken wrap with complementary ingredients.",
    price: 15000,
    type: "rolls",
  },
  {
    _id: "sample-pepsi",
    image: "/food/cola.jpg",
    title: "Pepsi 500 ml",
    desc: "A chilled soft drink.",
    price: 3000,
    type: "beverages",
  },
  {
    _id: "sample-iced-tea",
    image: "/food/cola.jpg",
    title: "Iced Tea",
    desc: "A chilled tea drink.",
    price: 4000,
    type: "beverages",
  },
  {
    _id: "sample-new-launch",
    image: "/food/crispy-chicken.jpg",
    title: "Crispy Chicken",
    desc: "Crispy fried chicken served with dipping sauce.",
    price: 12000,
    type: "launch",
  },
  {
    _id: "sample-chicken-roll",
    image: "/food/chicken-roll.png",
    title: "Chicken Roll",
    desc: "Seasoned chicken wrapped with fresh ingredients.",
    price: 10000,
    type: "rolls",
  },
  {
    _id: "sample-biryani",
    image: "/food/biryani-bucket.png",
    title: "Chicken Biryani Bucket",
    desc: "Chicken served with fragrant spiced rice.",
    price: 22000,
    type: "biryani",
  },
  {
    _id: "sample-box-meal",
    image: "/food/fried-chicken.jpg",
    title: "Chicken Box Meal",
    desc: "Crispy chicken served with fries and a side.",
    price: 25000,
    type: "boxmeals",
  },
  {
    _id: "sample-family-meal",
    image: "/food/fried-chicken.jpg",
    title: "Family Chicken Special",
    desc: "A generous chicken meal designed for sharing.",
    price: 45000,
    type: "stayhome",
  },
  {
    _id: "sample-fries",
    image: "/food/fries.jpg",
    title: "French Fries",
    desc: "A regular portion of crispy golden fries.",
    price: 5000,
    type: "snacks",
  },
];

let menuItemsRequest;

const normalizeType = (type = "") => {
  const normalizedType = type.toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases = {
    burgers: "burger",
    boxmeal: "boxmeals",
    sides: "snacks",
    newlaunch: "launch",
    chickenroll: "rolls",
    chickenrolls: "rolls",
    stayhomespecials: "stayhome",
    beverage: "beverages",
  };

  return aliases[normalizedType] || normalizedType;
};

const loadMenuItems = () => {
  if (!menuItemsRequest) {
    menuItemsRequest = getdata("/api/product/menu").then((items) => {
      if (!Array.isArray(items)) {
        throw new Error("Menu API returned an invalid response.");
      }
      return items;
    }).catch((error) => {
      console.error("Unable to load menu items from the API; showing the local menu.", error);
      return null;
    });
  }

  return menuItemsRequest;
};

export const getMenuItemsByType = async (type) => {
  const items = await loadMenuItems();

  if (items) {
    const normalizedType = normalizeType(type);
    const matchingItems = items
      .filter((item) => normalizeType(item.type) === normalizedType)
      .map((item) => ({
        ...item,
        image: getMenuImageForTitle(item.title) || item.image,
      }));

    if (matchingItems.length > 0) {
      return matchingItems;
    }

    console.warn(`No "${type}" items were returned by the API; showing local sample items.`);
  }

  return fallbackMenuItems.filter(
    (item) => normalizeType(item.type) === normalizeType(type)
  );
};

export const getFallbackMenuItem = (id) =>
  fallbackMenuItems.find((item) => item._id === id) || null;

export const getRecommendedMenuItems = async () => {
  const items = await loadMenuItems();
  const products = items?.length ? items : fallbackMenuItems;

  return products.slice(0, 3).map((item) => ({
    ...item,
    image: getMenuImageForTitle(item.title) || item.image,
  }));
};
