import {Profile} from '../../components';

interface ProfilePageProps {
    accounts: {
        name: string,
        value: number,
    }
}

const ProfilePage = (props: ProfilePageProps) => {
    const {accounts} = props;
    return (
        <>
            <Profile accounts={accounts}/>
        </>
    )
}

export default ProfilePage;

export async function getStaticProps(context:any) {
    // get account info
    const res = await fetch(`${process.env.SERVER}/api/account`);
    const {data} = await res.json();
    return {
        props: {
            accounts: data,
        }
    }
}