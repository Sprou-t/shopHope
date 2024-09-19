import {
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Box,
  Button
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../../store/product";

// container.sm adjusts the maximum width of the container, typically to a small size relative to different screen sizes
export default function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const {createProduct} = useProductStore()
  const handleAddProrduct = async() => {
    const {success, message} = await createProduct(newProduct)
    console.log("Success:", success)
    console.log("Message:", message)
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colourscheme="blue"
              onClick={handleAddProrduct}
              w="full"
            >Create</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
