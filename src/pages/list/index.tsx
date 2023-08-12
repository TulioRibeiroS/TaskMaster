import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Grid,
  Box,
  Stack,
  Switch,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  useEditableControls,
  ButtonGroup,
  Flex,
  Text,
  IconButton,
  useToast,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteTasks, getTasks, updateTasks } from "../../services/api";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

interface DataBaseType {
  date: string;
  description: string | null;
  id: number;
  concluded: boolean | null;
  title: string | null;
}

const CardGrid = () => {
  const [data, setData] = useState<DataBaseType[]>();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleTasks = () => {
    getTasks().then((response) => setData(response?.TaskManager));
  };

  useEffect(() => {
    handleTasks();
  }, []);

  console.log(data);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label=""
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        ></IconButton>
        <IconButton
          aria-label=""
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        ></IconButton>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label=""
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        ></IconButton>
      </Flex>
    );
  }

  return load ? (
    <Loading />
  ) : data?.length === 0 ? (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      padding={"5.2rem 9rem"}
      alignItems={"center"}
    >
      <Heading fontWeight={600} fontSize={`28px`} lineHeight={"110%"}>
        Ainda não tem nenhuma tarefa por aqui,<br />
        Que tal adicionar uma agora? <br />
        <br />
        <Text as={"span"} color={"blue.400"}>
          Clique no botão abaixo
        </Text>
      </Heading>
      <Button
        width={"20%"}
        onClick={() => navigate("/add-task")}
        colorScheme={"green"}
        bg={"blue.400"}
        rounded={"full"}
        px={6}
        _hover={{
          bg: "blue.500",
        }}
      >
        Adicionar tarefa
      </Button>
    </Stack>
  ) : (
    <Grid
      padding={"2rem"}
      templateColumns="repeat(4, 1fr)"
      gap={4}
      background={"#fff"}
      width="100vw"
    >
      {data
        ?.slice()
        .sort((a, b) => b.id - a.id)
        .map((card, index) => (
          <Box
            background={card.concluded ? "#9aff7a" : `#ffe37a`}
            key={index}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            {/* <p>{card.description}</p> */}
            <Editable
              as={"strong"}
              textAlign="center"
              defaultValue={card.title ?? ""}
              isPreviewFocusable={true}
              onSubmit={(value) =>
                updateTasks(card.id, "title", value).then(() => handleTasks())
              }
            >
              <EditablePreview />
              <Input as={EditableInput} height={"100"} />
              <EditableControls />
            </Editable>
            <Editable
              as={"p"}
              textAlign="center"
              defaultValue={card.description ?? ""}
              isPreviewFocusable={true}
              onSubmit={(value) =>
                updateTasks(card.id, "description", value).then(() =>
                  handleTasks()
                )
              }
            >
              <EditablePreview />
              <Input as={EditableInput} height={"100"} />
              <EditableControls />
            </Editable>

            <br />
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Switch
                  title={
                    card.concluded
                      ? "Marcar como pendente"
                      : "Marcar como concluído"
                  }
                  isChecked={card.concluded ?? false}
                  onChange={() =>
                    updateTasks(card.id, "concluded", !card.concluded).then(
                      () => handleTasks()
                    )
                  }
                  size="md"
                />
                <strong
                  style={{
                    color: card.concluded ? "#6880ff" : `#ff6c6c`,
                  }}
                >
                  {card.concluded ? "Concluído" : "Pendente"}
                </strong>
              </Stack>
              <IconButton
                onClick={() =>
                  deleteTasks(card.id)
                    .then(() => {
                      setLoad(true);
                      handleTasks();
                      setTimeout(() => {
                        setLoad(false);
                      }, 2000);
                      toast({
                        title: "Task removida com sucesso",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    })
                    .catch(() =>
                      toast({
                        title: "Falha ao remover task",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      })
                    )
                }
                aria-label=""
                size="sm"
                icon={<DeleteIcon />}
              ></IconButton>
            </Stack>
          </Box>
        ))}
    </Grid>
  );
};

export default CardGrid;
