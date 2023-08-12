"use client";

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={"auto"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          padding={"5.2rem 9rem"}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Task Master <br />
            <Text as={"span"} color={"blue.400"}>
              Simplificando o Gerenciamento de Tarefas
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            O Task Master é o gerenciador de tarefas para você acompanhar,
            organizar e concluir suas atividades diárias com facilidade. Com
            nossa interface intuitiva e recursos avançados, nunca foi tão
            simples administrar suas tarefas e manter-se focado em suas metas.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              onClick={() => navigate("add-task")}
              colorScheme={"green"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "blue.500",
              }}
            >
              Adicionar Tarefa
            </Button>
            <footer>
              By: TúlioRibeiro
            </footer>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
