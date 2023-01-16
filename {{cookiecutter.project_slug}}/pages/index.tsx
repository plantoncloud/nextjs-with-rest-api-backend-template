import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {GetServerSideProps} from 'next'
import { useEffect } from 'react';

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

export default function Home({ backendApiConfig }: Props) {
    
    //fetch todos on page load
    useEffect(() => {
        // load data here
        async function fetchTodos() {
            console.log('feting todos from ' + backendApiConfig.apiBaseUrl);
            const res = await fetch(backendApiConfig.apiBaseUrl);
            const resp = await res.json();
            console.log(resp)
        }
        fetchTodos();
      }, []);

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>A NextJS Todo app launched on Planton Cloud in minutes!!</p>
            </section>
        </Layout>
    )
}
