// Imports
// ========================================================
import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useAuth0 } from "@auth0/auth0-react";

// Providers
import { useAuthLoader } from "../../providers/AuthLoaderProvider";

// Layout
import PageLayout from "../../layout/Page";

// Components
import Loader from "../../components/Loader";

// Page
// ========================================================
const AccountPage = () => {
  // Props
  const { user: authUser } = useAuth0();
  const { token, user: apiUser, userIsLoading, getUser } = useAuthLoader();
  const [user, setUser] = useState<{ [key: string]: any }>({});

  // Requests
  /**
   * 
   */
  const { data: usernameData, isLoading: usernameLoading, mutate: mutateUsername, isError: usernameIsError, error: usernameError } = useMutation(async ({ token, username }: { token?: string, username: string }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          display: username
        })
      });
      if (response.ok) {
        const json = await response.json();
        await getUser();
        return json?.data ?? json;
      }
      throw new Error((await response.json())?.errors ?? 'Unknown');
    } catch (error: any) {
      throw new Error(error?.message ?? error);
    }
  });

  /**
   * 
   */
  const { isLoading: userLoading, mutate: mutateUser } = useMutation(async ({ token, user }: { token?: string, user: { [key: string]: any } }) => {
    if (Object.keys(user).length === 0) return true;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: user.name
        })
      });
      if (response.ok) {
        const json = await response.json();
        await getUser();
        return json?.data ?? json;
      }
      throw new Error(await response.json());
    } catch (error: any) {
      throw new Error(error);
    }
  });

  // Functions
  /**
   * 
   * @param event 
   */
  const onChangeInputUser = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [key]: event.target.value
    })
  };

  /**
   * 
   * @param event 
   */
  const onSubmitFormUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateUsername({ token, username: user?.display ?? '' })
  };

  /**
   * 
   * @param event 
   */
  const onSubmitFormName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateUser({ token, user: { name: user.name } });
  }

  // Hooks
  useEffect(() => {
    if (!apiUser) return;
    setUser(apiUser);
  }, [apiUser])

  // Render
  return <div>
    <PageLayout>
      <div className="px-4 py-8">
        <div className="flex -mx-2">
          <div className="mx-4 w-full block rounded border border-gray-200 shadow-lg">
            <div className="p-4 flex -mx-2">
              <div className="w-1/2 min-h-full block mx-2">
                <pre className="bg-gray-200 p-4 w-full h-full rounded overflow-scroll">
                  <code>{JSON.stringify({
                    authUser,
                    apiUser
                  }, null, ' ')}</code>
                </pre>
              </div>
              <div className="w-1/2 min-h-full block mx-2">
                <div className="p-8 border-gray-100 rounded border">
                  <h1 className="text-xl font-semibold ">User Information</h1>
                  <p className="text-gray-500 mb-4">Here you can edit your account details.</p>
                  <hr className="border-gray-100 mb-6" />
                  <form onSubmit={onSubmitFormUsername}>
                    <div className="mb-4">
                      <label className="text-gray-600 uppercase text-xs font-semibold block mb-2" htmlFor="username">Username</label>
                      <input id="username" value={user?.display ?? ''} onChange={onChangeInputUser('display')} disabled={userIsLoading || usernameLoading || apiUser?.display ? true : false} autoComplete="off" className="h-10 disabled:text-gray-400 mb-1 w-full border rounded border-grey-400 px-4" type="text" placeholder="Your username" />
                      {!apiUser?.display && user?.display ? <p className="text-red-600 text-sm">Please note once you have chosen a username you cannot change it.</p> : null}
                      {usernameIsError ? <div className="bg-red-300 p-4 rounded mt-2 text-sm font-semibold text-red-800">{(usernameError as any)?.message.toLowerCase().indexOf('unique') > -1 ? 'Username already exists.' : JSON.stringify((usernameError as any)?.message)}</div> : null}
                    </div>
                    <div>
                      <button disabled={userIsLoading || usernameLoading || apiUser?.display ? true : false} type="submit" className="bg-gray-500 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-gray-500 text-white hover:bg-gray-800 h-10 rounded px-8 transition-colors ease-in-out duration-200">{apiUser?.display ? 'Already Set' : userIsLoading || usernameLoading ? <Loader className="h-5" /> : 'Send'}</button>
                    </div>
                  </form>
                  <hr className="border-gray-100 mb-6" />
                  <form onSubmit={onSubmitFormName}>
                    <div className="mb-4">
                      <label className="text-gray-600 uppercase text-xs font-semibold block mb-2" htmlFor="name">Name</label>
                      <input id="name" value={user?.name ?? ''} onChange={onChangeInputUser('name')} disabled={userIsLoading || userLoading} autoComplete="off" className="h-10 disabled:text-gray-400 mb-1 w-full border rounded border-grey-400 px-4" type="text" placeholder="Your name" />
                    </div>
                    <div>
                      <button disabled={userIsLoading || userLoading} type="submit" className="bg-gray-500 disabled:opacity-40 disabled:cursor-default disabled:hover:bg-gray-500 text-white hover:bg-gray-800 h-10 rounded px-8 transition-colors ease-in-out duration-200">{userIsLoading || userLoading ? <Loader className="h-5" /> : 'Update'}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </div>
}

// Exports
// ========================================================
export default AccountPage;