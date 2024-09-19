import {create} from "zustand"

const apiUrl = BACKEND_URL;
// create a state management store
// set is a function provided by zustand to update the state of the store.
export const useProductStore = create((set) =>({
    products: [],
    // setProducts is a method that can take in an arg to execute the function
    setProducts: (products) => set({ products}),
    createProduct: async(newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price){
            return{success: false, message:"Please fill in all fields"}
        }
        const res = await fetch(`http://localhost:5000/products`, {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({
            products: [...state.products, data.data], // Correctly add the new product to the array
          }));
        return {success: true, message:"product created successfully."}
    }
}
))