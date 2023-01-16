import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {GetServerSideProps} from 'next'
import {useEffect, useState} from 'react';
import {TodosTable} from "./components/todos-table";
import {Button} from "@material-ui/core";
import Link from "next/link";
import {constants} from "os";
import errno = module

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

export default function Home({backendApiConfig}: Props) {
    const [todos, setTodos] = useState<Todo[]>([]);

    async function fetchTodos() {
        const todosUrl = `${backendApiConfig.apiBaseUrl}/todos`
        console.log('fetching todos from ' + todosUrl);
        const response = await fetch(todosUrl);
        return await response.json() as Todo[];
    }

    async function postDeleteTodoReq(id: number) {
        console.log("deleting todo")
        const createTodoUrl = `${backendApiConfig.apiBaseUrl}/todos/${id}`
        return await fetch(createTodoUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).catch(err => {
            console.log("failed to delete")
        }).then(resp => {
            console.log("delete successful")
        });
    }

    //fetch todos on page load
    useEffect(() => {
        fetchTodos().then(todos => {
            setTodos(todos);
        });
    }, []);

    function handleDelete(id: number) {
        postDeleteTodoReq(id).then(resp => console.log('task deleted successfully'));
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>A NextJS Todo app launched on Planton Cloud in minutes!!</p>
            </section>
            <div>
                <TodosTable todos={todos}/>
            </div>
            <Link href="/add">
                <Button variant="outlined">Add New</Button>
            </Link>
        </Layout>
    )
}
