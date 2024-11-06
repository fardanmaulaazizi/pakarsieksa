import Product from "./product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const products = [
    {
      id: 1,
      name: "Hammer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eos facilis sapiente error beatae voluptatem porro dicta minima adipisci. Praesentium debitis esse delectus dolor error fugiat ad rerum laborum quasi corrupti itaque consectetur, repudiandae iure? Qui alias, vitae, in consequuntur necessitatibus rem accusantium reprehenderit rerum est nobis dolorem ex expedita fugiat, tempore corrupti debitis velit ipsa unde. Eum qui nam ad cum rerum esse blanditiis quibusdam ut sapiente. Enim repellat quae rem reiciendis eligendi nisi quaerat aut ipsa architecto modi nesciunt debitis provident nemo, voluptatum, corrupti incidunt nostrum voluptas vitae praesentium! Ea sit eos nostrum. Aspernatur non optio inventore cum!",
      category: "Tools",
      price: 10000,
    },
    {
      id: 2,
      name: "Painting",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eos facilis sapiente error beatae voluptatem porro dicta minima adipisci. Praesentium debitis esse delectus dolor error fugiat ad rerum laborum quasi corrupti itaque consectetur, repudiandae iure? Qui alias, vitae, in consequuntur necessitatibus rem accusantium reprehenderit rerum est nobis dolorem ex expedita fugiat, tempore corrupti debitis velit ipsa unde. Eum qui nam ad cum rerum esse blanditiis quibusdam ut sapiente. Enim repellat quae rem reiciendis eligendi nisi quaerat aut ipsa architecto modi nesciunt debitis provident nemo, voluptatum, corrupti incidunt nostrum voluptas vitae praesentium! Ea sit eos nostrum. Aspernatur non optio inventore cum!",
      category: "Painting",
      price: 10000,
    },
    {
      id: 3,
      name: "Painting",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eos facilis sapiente error beatae voluptatem porro dicta minima adipisci. Praesentium debitis esse delectus dolor error fugiat ad rerum laborum quasi corrupti itaque consectetur, repudiandae iure? Qui alias, vitae, in consequuntur necessitatibus rem accusantium reprehenderit rerum est nobis dolorem ex expedita fugiat, tempore corrupti debitis velit ipsa unde. Eum qui nam ad cum rerum esse blanditiis quibusdam ut sapiente. Enim repellat quae rem reiciendis eligendi nisi quaerat aut ipsa architecto modi nesciunt debitis provident nemo, voluptatum, corrupti incidunt nostrum voluptas vitae praesentium! Ea sit eos nostrum. Aspernatur non optio inventore cum!",
      category: "Painting",
      price: 10000,
    },
    {
      id: 4,
      name: "Painting",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eos facilis sapiente error beatae voluptatem porro dicta minima adipisci. Praesentium debitis esse delectus dolor error fugiat ad rerum laborum quasi corrupti itaque consectetur, repudiandae iure? Qui alias, vitae, in consequuntur necessitatibus rem accusantium reprehenderit rerum est nobis dolorem ex expedita fugiat, tempore corrupti debitis velit ipsa unde. Eum qui nam ad cum rerum esse blanditiis quibusdam ut sapiente. Enim repellat quae rem reiciendis eligendi nisi quaerat aut ipsa architecto modi nesciunt debitis provident nemo, voluptatum, corrupti incidunt nostrum voluptas vitae praesentium! Ea sit eos nostrum. Aspernatur non optio inventore cum!",
      category: "Painting",
      price: 10000,
    },
  ];

  const id = (await params).id;
  const product = products.find((product) => product.id === Number(id));
  return <Product />;
}
