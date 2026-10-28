import React from "react";
import { getMenuImageForTitle } from "../utils/menuCatalog";

const getFallbackImage = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (/burger|sandwich|zinger/.test(normalizedTitle)) {
    return "/food/chicken-sandwich.jpg";
  }
  if (/fries|side|coleslaw/.test(normalizedTitle)) {
    return "/food/fries.jpg";
  }
  if (/drink|beverage|pepsi|7up|mirinda|cola/.test(normalizedTitle)) {
    return "/food/cola.jpg";
  }
  if (/biryani|rice/.test(normalizedTitle)) {
    return "/food/biryani.jpg";
  }
  if (/dessert|sweet/.test(normalizedTitle)) {
    return "/food/dessert.jpg";
  }

  return "/food/fried-chicken.jpg";
};

const MenuImage = ({ image, title, alt = "", ...imageProps }) => {
  const fallbackImage = getFallbackImage(title);
  const matchingImage = getMenuImageForTitle(title);

  return (
    <img
      {...imageProps}
      src={matchingImage || image || fallbackImage}
      alt={alt || title || "Menu item"}
      onError={(event) => {
        const imageElement = event.currentTarget;
        imageElement.onerror = null;
        imageElement.src = fallbackImage;
      }}
    />
  );
};

export default MenuImage;
