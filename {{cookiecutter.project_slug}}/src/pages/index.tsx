import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { TodosTable } from "../components/todos-table";
import { Box, Button } from "@material-ui/core";
import Link from "next/link";
import { Todo } from "../lib/todo";

interface Props {
  apiBaseUrl: string | null | undefined;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      apiBaseUrl: process.env.BACKEND_API_BASE_URL || null,
    },
  };
};

export default function Home({ apiBaseUrl }: Props) {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function fetchTodos() {
    const todosUrl = `${apiBaseUrl}/todos`;
    console.log("fetching todos from " + todosUrl);
    const response = await fetch(todosUrl);
    return (await response.json()) as Todo[];
  }

  async function postDeleteTodoReq(id: number) {
    const deleteTodoUrl = `${apiBaseUrl}/todos/${id}`;
    return await fetch(deleteTodoUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .catch((err) => {
        console.log("failed to delete");
      })
      .then((resp) => {
        console.log("delete successful");
      });
  }

  async function updateTodoReq(todo: Todo) {
    const updateTodoUrl = `${apiBaseUrl}/todos/${todo.id}`;
    return await fetch(updateTodoUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, completed: true }),
    })
      .catch((err) => {
        console.log("failed to mark complete");
      })
      .then((resp) => {
        console.log("marked complete successful");
      });
  }

  //fetch todos on page load
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    fetchTodos().then((todos) => {
      setTodos(todos);
    });
  };

  const handleDelete = (id: number) => {
    postDeleteTodoReq(id).then((resp) => {
      console.log("todo deleted successfully");
      loadTodos();
    });
  };

  const handleMarkComplete = (todo: Todo) => {
    console.log(todo)
    updateTodoReq(todo).then((resp) => {
      console.log("todo marked complete successfully");
      loadTodos();
    });
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>A NextJS Todo app launched on Planton Cloud in minutes!!</p>
      </section>
      <Box mb={2}>
        <TodosTable
          todos={todos}
          onTodoDelete={handleDelete}
          onMarkComplete={handleMarkComplete}
        />
      </Box>
      <Box className={utilStyles.buttonsContainer}>
        <Link href="/add">
          <Button variant="outlined" color="primary">
            Add New
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}
