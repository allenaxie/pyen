import { Profile } from '../../components';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Form } from 'antd';

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
    const [updateAccountItems, setUpdateAccountItems] = useState(-1);
    const [currentAccountItem, setCurrentAccountItem] = useState({});
    const [editForm] = Form.useForm();

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
    }, [updateAccountItems])

    useEffect(() => {
        // reset form initial values
        editForm.resetFields();
    }, [currentAccountItem])


    return (
        <>
            <Profile
                userAccountItems={userAccountItems}
                setUserAccountItems={setUserAccountItems}
                setUpdateAccountItems={setUpdateAccountItems}
                updateAccountItems={updateAccountItems}
                setCurrentAccountItem={setCurrentAccountItem}
                editForm={editForm}
                currentAccountItem={currentAccountItem}
            />
        </>
    )
}

export default ProfilePage;