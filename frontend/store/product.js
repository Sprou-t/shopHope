import { create } from "zustand";

// create a state management store that can set the state, send POST req to create new data
// set is a function provided by zustand to update the state of the store.
export const useProductStore = create((set) => ({
  products: [], // Initial state: an empty array of products
  // setProducts is a method that can take in an arg to execute the function
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch(`http://localhost:5000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    // res is the response obj returned from the fetch call
    // reads the response body and attempts to parse the json formatted data into sth js can work w
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data], // Correctly add the new product to the array
    }));
    return { success: true, message: "product created successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();

    // Extract image URLs from products
    const imageUrls = data.data.map((product) => product.image);
    // Fetch images and convert them to base64 strings
    const imageResponse = await fetch(
      "http://localhost:5000/products/load-url-images",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: imageUrls }),
      }
    );

    const imageData = await imageResponse.json();

    // Update the products with base64 images
    const productsWithBase64Images = data.data.map((product, index) => ({
      ...product,
      image: imageData.images[index], // Replace the URL with the base64 string
    }));

    set({ products: productsWithBase64Images });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`http://localhost:5000/products/${pid}`, {
        method: "DELETE", // Ensure the method is DELETE when deleting a product
      });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message} // sends data back to caller. in the component that uses
    // the function, can access the val eg. result= await deleteProducts("product_id");
    // if (result.succes)
  },
}));
