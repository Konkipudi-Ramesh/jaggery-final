import { useCart } from "../context/CartContext";

const jaggeryVarieties = [
  {
    name: "Organic Jaggery Cube",
    description: "Naturally processed jaggery cubes made from organic sugarcane.",
    image: "https://c8.alamy.com/comp/2JMXC2R/organic-gur-or-jaggery-powder-and-cubes-jaggery-is-used-as-an-ingredient-in-sweet-and-savoury-dishes-in-the-cuisines-of-india-jaggery-powder-is-unre-2JMXC2R.jpg",
    price: 150,
  },
  {
    name: "Liquid Jaggery",
    description: "Pure liquid jaggery perfect for baking and beverages.",
    image: "https://img.freepik.com/premium-photo/sugarcane-juice-with-garden-background_741910-14984.jpg?w=2000",
    price: 120,
  },
  {
    name: "Palm Jaggery",
    description: "Traditional palm jaggery rich in minerals and taste.",
    image: "https://www.debongo.com/wp-content/uploads/2020/11/Jaggery-600x385.png",
    price: 180,
  },
];

export default function Dashboard() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 p-8">
      <h1 className="text-4xl font-bold text-center text-yellow-800 mb-10">
        Explore Jaggery Varieties
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jaggeryVarieties.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <p className="text-lg font-bold text-yellow-800 mb-3">₹{item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl transition duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
