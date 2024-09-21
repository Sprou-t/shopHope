import React from "react";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useProductStore } from "../../store/product.js";

export default function ProductCard({ product }) {
  //first val is color used when user in light mode, second when user in dark mode. val larger means darker
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h3"} size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<FaRegEdit />} colorScheme="blue" />
          <IconButton
            icon={<MdOutlineDelete />}
            onClick={() => {
              handleDeleteProduct(product._id);
            }}
            colorScheme="red"
          />
        </HStack>
      </Box>
    </Box>
  );
}
