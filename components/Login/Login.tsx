import { useSession, signIn, signOut } from "next-auth/react";
import classes from './Login.module.scss';
import Image from 'next/image';
import { Row, Col} from 'antd';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from 'react-icons/fa';

const Login = ({ providers }: any) => {
  const { data: session } = useSession()

  const providerIcons = [
    <FcGoogle key="google"/>,
    <FaGithub key="github"/>,
  ]

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <Image src={`${session?.user?.image}`} width={200} height={200} alt="user image"/>
        <h2>{session?.user?.name}</h2>
        <button onClick={() => signOut({
          callbackUrl: `${window.location.origin}/login`
        })}>Sign out</button>
      </>
    )
  } else {
    return (
      <>
        <Row className={classes.container}>
          <Col
          xs={{ span: 24 }}
          lg={{ span: 16, offset:4 }}
          className={classes.col}
          >
            <div className={classes.title}>
              <h1>Login</h1>
            </div>
            Login using your favorite applications!
            {Object.values(providers).map((provider, index)  => (
              <div key={((provider as any).name)} className={classes.providerBtn}
              >
                <button 
                onClick={() => signIn((provider as any).id, {
                  callbackUrl: `${window.location.origin}`,
                })}>
                  Sign In with 
                  {providerIcons[index]}
                </button>
              </div>
            ))}
          </Col>
        </Row>

      </>
    )
  }
}

export default Login;
