import {useRouter} from "next/router";
import {FormEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {GetServerSideProps} from "next";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    backendApiConfig: {
        apiBaseUrl: string;
    };
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return {
        props: {
            backendApiConfig: {
                apiBaseUrl: process.env.BACKEND_API_BASE_URL,
            },
        },
    };
};

export default function TodoAddForm({backendApiConfig}: Props) {
    const classes = useStyles();
    const router = useRouter();
    const [newTask, setNewTask] = useState('');

    const handleCancelClick = () => {
        router.push({pathname: '/', query: router.query});
    };

    async function postAddTodoReq(todo: Todo) {
        const createTodoUrl = `${backendApiConfig.apiBaseUrl}/todos`
        const response = await fetch(createTodoUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        return await response.json();
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postAddTodoReq({id: 0, task: newTask, completed: false}).then(resp => console.log(resp));
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                label="Enter Task"
                className={classes.textField}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"

            >
                Submit
            </Button>
            <Button onClick={handleCancelClick}>
                Cancel
            </Button>
        </form>
    );
}
