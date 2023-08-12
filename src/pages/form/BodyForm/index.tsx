import {
  VStack,
  Input,
  useToast,
  Box,
  Button,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AlertPopup from "../AlertPopup";
import { insertTasks } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Builder() {
  const toast = useToast();
  const [data, setData] = useState({ title: "", description: "", date: "" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    insertTasks(data)
      .then(() => {
        toast({
          title: "Task adicionada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/list-task");
        }, 500);
      })
      .catch(() =>
        toast({
          title: "Erro ao adicionar Task",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
    setData(data);
  };

  console.log(data);
  console.log(errors);

  return (
    <Box
      height="calc(100vh - 7.5rem)"
      width="100vw"
      justifyContent={"center"}
      flexDirection={"column"}
      gap={8}
      display={"flex"}
      alignItems={"center"}
    >
      <Heading as="h1">Adicione uma tarefa</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack width={"360px"}>
          <Input
            type="text"
            placeholder="Título"
            {...register("title", {
              required: "Insira o Título da tarefa",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.firstname && <AlertPopup title={errors.firstname.message} />}
          <Textarea
            placeholder="Descrição"
            {...register("description", {
              required: "Insira a descrição da tarefa",
              minLength: 3,
              maxLength: 100,
            })}
          />
          {errors.lastname && <AlertPopup title={errors.lastname.message} />}
          <Input
            type="date"
            placeholder="Insira a Data"
            {...register("date", {
              required: "Insira a Data de realização da atividade",
              minLength: { value: 8, message: "Too short" },
            })}
          />
          {errors.password && <AlertPopup title={errors.password.message} />}

          <Button
            borderRadius="md"
            bg="cyan.600"
            _hover={{ bg: "cyan.200" }}
            variant="ghost"
            type="submit"
          >
            Enviar
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
