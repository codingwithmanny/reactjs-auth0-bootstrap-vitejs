// Imports
// ========================================================
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';

// Layout
import PageLayout from "../../layout/Page";

// Components
import Loader from "../../components/Loader";

// Page
// ========================================================
const HomePage = () => {
  // Requests
  const { data, isLoading } = useQuery(['listUsers'], async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        return json?.data ?? json;
      }
      throw new Error(await response.json());
    } catch (error: any) {
      throw new Error(error);
    }
  });

  // Render
  return <div>
    <PageLayout>
      <div className="px-4 py-8">
        {isLoading
          ? <div className="flex mt-32 mx-auto w-20 justify-center p-5 rounded shadow-lg">
            <Loader darkMode />
          </div>
          : <div className="flex -mx-2">
            {(data as any)?.filter((user: any) => user?.display)?.length > 0
              ? (data as any).filter((user: any) => user?.display).map((user: any) => <Link to={`/users/${user?.display}`} key={`user-${user?.id}`} className="mx-4 block rounded border border-gray-200 shadow-lg hover:scale-105 transition-all ease-in-out duration-300">
                <div className="p-4">
                  <span className="block relative bg-gray-400 rounded mb-2">
                    <img className="block w-80" src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`} />
                    <span className="h-4 leading-4 text-gray-600 text-center absolute inset-0 m-auto">{user?.display}</span>
                  </span>
                </div>
              </Link>)
              : <div>No results</div>
            }
          </div>}
      </div>
    </PageLayout>
  </div>
}

// Exports
// ========================================================
export default HomePage;