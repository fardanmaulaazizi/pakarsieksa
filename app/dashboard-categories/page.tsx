import { dummyCategories, dummySubcategories } from "@/data/dummyCategories";
import Categories from "./categories";
import SubCategories from "./subCategories";

export default function Page() {
  const categories = dummyCategories;
  const subCategories = dummySubcategories;
  return (
    <>
      <Categories allCategories={categories} />
      <SubCategories allSubCategories={subCategories} />
    </>
  );
}
