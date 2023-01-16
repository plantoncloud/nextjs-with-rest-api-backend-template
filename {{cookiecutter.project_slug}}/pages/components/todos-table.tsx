import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import React from "react";

export const TodosTable: React.FC<{ todos: Array<{ id: number, task: string, completed: boolean }> }> = ({
                                                                                                             todos
                                                                                                         }) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>Completed?</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {todos.map((todo) => (
                    <TableRow key={todo.id}>
                        <TableCell>{todo.id}</TableCell>
                        <TableCell>{todo.task}</TableCell>
                        <TableCell>{todo.completed ? 'Yes' : 'No'}</TableCell>
                        <TableCell>
                            <Button variant="outlined">Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
