import { Profile } from '../../components';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface ProfilePageProps {
    accounts: {
        name: string,
        value: number,
    }
}

const ProfilePage = (props: ProfilePageProps) => {
    const { accounts } = props;
    const { data: session } = useSession();
    const [userAccountItems, setUserAccountItems] = useState([]);

    useEffect(() => {
        const getUserAccountItems = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/accountItem?user=${session?.user?.id}`,);
                const { data } = await res.json();
                setUserAccountItems(data);
            } catch (err) {
                console.log(err);
            }
        }
        getUserAccountItems();
    }, [])

    return (
        <>
            <Profile userAccountItems={userAccountItems} setUserAccountItems={setUserAccountItems}/>
        </>
    )
}

export default ProfilePage;

// export async function getStaticProps(context:any) {
//     // get current user

//     // get account info
//     const res = await fetch(`${process.env.SERVER}/api/accountItem?user=12312`,);
//     const {data} = await res.json();
//     return {
//         props: {
//             accounts: data,
//         }
//     }
// }