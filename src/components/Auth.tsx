import { useSession, signIn, signOut } from "next-auth/react";

export default function Auth(): JSX.Element {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session) {
    return (
      <>
        <p className='font-mono'>Signed in as {session.user?.email}</p>
        <p>{session?.user?.id}</p>
        <p>hoge</p>

        <button className='font-mono' onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <p className='font-mono'>Not signed in</p>
      <button className='font-mono' onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
