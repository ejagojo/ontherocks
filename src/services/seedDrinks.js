import { db } from "./firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const cocktailData = [
  {
    name: "Shandy",
    alcohol_type: "Beer",
    recipe_url: "https://abarabove.com/recipe/beer-cocktail-shandy/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2020/03/abaraboveteam_a_food_blog_photo_of_a_light_beer_mixed_with_lemo_d35ecfaa-50e7-4387-9b28-50ccfe2f1b3c-e1717109421347.png"
  },
  {
    name: "Naked & Famous",
    alcohol_type: "Mezcal",
    recipe_url: "https://abarabove.com/recipe/naked-famous-cocktail/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2024/09/4H7A2481-Edit-scaled-e1724188133561.jpg"
  },
  {
    name: "Old Fashioned",
    alcohol_type: "Whiskey",
    recipe_url: "https://abarabove.com/recipe/old-fashioned-recipe/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2019/01/an-old-fashioned-bulleit-bourbon-cocktail-with-orange-peel-and-maraschino-cherry-and-2-ounces-bourbon.jpg"
  },
  {
    name: "Paper Plane",
    alcohol_type: "Bourbon",
    recipe_url: "https://abarabove.com/recipe/paper-plane-cocktail-recipe/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2024/03/4H7A1363-scaled-e1709597315684.jpg"
  },
  {
    name: "Classic Gin Martini",
    alcohol_type: "Gin",
    recipe_url: "https://abarabove.com/recipe/classic-gin-martini/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2017/02/P2-Classic-Gin-Martini.jpg"
  },
  {
    name: "Screwdriver",
    alcohol_type: "Vodka",
    recipe_url: "https://abarabove.com/recipe/screwdriver-cocktail-recipe/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2023/11/screwdriver-top-down--e1701107895524.png"
  },
  {
    name: "Lemon Drop Martini",
    alcohol_type: "Vodka",
    recipe_url: "https://abarabove.com/recipe/lemon-drop-martini-recipe/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2023/11/3.-refreshing-lemon-drop-in-a-chilled-glass-with-lemon-ribbon-for-a-decorative-touch.png"
  },
  {
    name: "Boulevardier",
    alcohol_type: "Whiskey",
    recipe_url: "https://abarabove.com/recipe/the-boulevardier/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2016/08/my-favorite-cocktail-the-boulevardier-by-Erskinne-Gwynne-with-high-proof-bourbon-e1695767786454.png"
  },
  {
    name: "French 75",
    alcohol_type: "Gin",
    recipe_url: "https://abarabove.com/recipe/french-75/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2019/06/French-75-_2-e1699995906826.png"
  },
  {
    name: "Chocolate Martini",
    alcohol_type: "Vodka",
    recipe_url: "https://abarabove.com/recipe/chocolate-martini-recipe/",
    image_url: "https://149347875.v2.pressablecdn.com/wp-content/uploads/2023/08/1.-Dessert-Martini-with-creamy-texture-in-Glass-with-cocoa-powder-and-dark-chocolate-shavings-via-Adobe-Stock.jpg"
  }
];

export const seedCocktailRecipes = async () => {
  try {
    for (const cocktail of cocktailData) {
      const docRef = doc(collection(db, "cocktailRecipes"));
      await setDoc(docRef, cocktail, { merge: true });
    }
    console.log("Cocktail recipe data seeded successfully!");
  } catch (error) {
    console.error("Error seeding cocktail recipes:", error);
  }
};

export const fetchCocktailRecipes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "cocktailRecipes"));
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
  } catch (error) {
    console.error("Error fetching cocktail recipes:", error);
    return [];
  }
};
