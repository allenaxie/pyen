import classes from './Profile.module.scss';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Profile = () => {
    const { data: session } = useSession();

    return (
        <>
         Signed in as {session?.user?.email} <br />
        <Image src={`${session?.user?.image}`} width={200} height={200} />
        <h2>{session?.user?.name}</h2>
        <button onClick={() => signOut({
          callbackUrl: `${window.location.origin}/login`
        })}>Sign out</button>
        </>
    )
}

export default Profile;