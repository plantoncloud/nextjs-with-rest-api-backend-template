import React, { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Button, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout, { siteTitle } from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import { Todo } from "../lib/todo";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

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

export default function TodoAddForm({ apiBaseUrl }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const [newTask, setNewTask] = useState("");

  const handleCancelClick = () => {
    router.push({ pathname: "/", query: router.query });
  };

  async function postAddTodoReq(todo: Todo) {
    const createTodoUrl = `${apiBaseUrl}/todos`;
    const response = await fetch(createTodoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return await response.json();
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postAddTodoReq({ id: 0, task: newTask, completed: false }).then((resp) => {
      console.log(resp);
      router.push({ pathname: "/", query: router.query });
    });
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h3>Add a task</h3>
      </section>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Enter Task"
          className={classes.textField}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
        />
        <Box className={utilStyles.buttonsContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </Box>
      </form>
    </Layout>
  );
}
