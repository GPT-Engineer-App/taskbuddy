import React, { useState } from "react";
import { ChakraProvider, Box, VStack, HStack, Input, IconButton, Text, Heading, useToast, extendTheme } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      // ... 900
    },
  },
});

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;

    setTodos([...todos, inputValue]);
    setInputValue("");

    toast({
      title: "Todo Added",
      description: "Your todo has been added to the list.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);

    toast({
      title: "Todo Deleted",
      description: "Your todo has been removed from the list.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <VStack spacing={8}>
          <Heading mb={6}>Todo App</Heading>
          <HStack>
            <Input value={inputValue} onChange={handleInputChange} placeholder="Add a todo" onKeyPress={handleKeyPress} />
            <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="teal" aria-label="Add todo" />
          </HStack>
          <VStack spacing={4} align="stretch">
            {todos.map((todo, index) => (
              <HStack key={index}>
                <Text flex={1}>{todo}</Text>
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
