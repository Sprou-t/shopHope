import { Container, VStack, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useProductStore } from "../../store/product.js";
import { useEffect } from "react";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  // runs once component first mounts. also runs when fetchProducts changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); //effect will only run again if fetchProducts changes ie. new data added

  // Log the products or specific image URL when products change ie. fetchProducts has finished executing
  useEffect(() => {
    console.log("products", products); // Log all products
  }, [products]);

  return (
    <Container maxW={"container.x1"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w="full"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length == 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
