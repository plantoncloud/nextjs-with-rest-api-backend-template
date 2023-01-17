import React from "react";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@material-ui/core";

import styles from "./todos-table.module.css";
import { Todo } from "../lib/todo";

export const TodosTable: React.FC<{
  todos: Array<{ id: number; task: string; completed: boolean }>;
  onTodoDelete: (id: number) => void;
  onMarkComplete: (todo: Todo) => void;
}> = ({ todos, onTodoDelete, onMarkComplete }) => {
  return (
    <Table className={styles.container}>
      <TableHead>
        <TableRow>
          <TableCell>
            <strong>Id</strong>
          </TableCell>
          <TableCell>
            <strong>Task</strong>
          </TableCell>
          <TableCell>
            <strong>Completed?</strong>
          </TableCell>
          <TableCell>
            <strong>Actions</strong>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todos.map(({ id, task, completed }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>{task}</TableCell>
            <TableCell>{completed ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Box>
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  startIcon={<CheckCircleOutlineIcon />}
                  disabled={completed}
                  onClick={() => onMarkComplete({ id, task, completed })}
                >
                  Mark Completed
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className={styles.actionBtn}
                  onClick={() => onTodoDelete(id)}
                >
                  Delete
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
