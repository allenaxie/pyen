import {Login} from '../../components';
import classes from './login.module.scss';
import { getProviders, getSession } from "next-auth/react";

const LoginPage = ({ providers, session }: any) => {
    return (
        <div className={classes.container}>
        <Login providers={providers} session={session}/>

    </div>
    )
}

export default LoginPage;

export async function getServerSideProps(context:any) {
    return {
        props: {
            providers: await getProviders(),
            session: await getSession(context),
        }
    };
}