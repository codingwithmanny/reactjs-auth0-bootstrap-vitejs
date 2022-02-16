// Imports
// ========================================================
import { useQuery } from 'react-query';

// Layout
import PageLayout from "../../layout/Page";

// Components
import Loader from "../../components/Loader";
import { useParams } from 'react-router-dom';

// Page
// ========================================================
const UserPage = () => {
  // Props
  const { id } = useParams();

  // Requests
  /**
   * 
   */
  // Requests
  const { data, isLoading, isError } = useQuery(['readUser'], async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
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
      {isLoading
        ? <div className="flex mt-32 mx-auto w-20 justify-center p-5 rounded shadow-lg">
          <Loader darkMode />
        </div>
        : isError ?
          <div className="flex mt-32 mx-auto w-32 leading-10 justify-center p-5 rounded shadow-lg text-pink-500 font-mono">
            Not Found
          </div>
          : <div className="px-4 py-8">
            <div className="flex -mx-2">
              <div className="mx-4 w-full block rounded border border-gray-200 shadow-lg">
                <div className="p-4 flex -mx-2">
                  <div className="w-1/2 min-h-full block mx-2">
                    <pre className="bg-gray-200 p-4 w-full min-h-full rounded overflow-scroll">
                      <code>{JSON.stringify({
                        data
                      }, null, ' ')}</code>
                    </pre>
                  </div>
                  <div className="w-1/2 min-h-full block mx-2">
                    <div className="p-8 border-gray-100 rounded border">
                      <h1 className="text-xl font-semibold ">User Information</h1>
                      <p className="text-gray-500 mb-4">Retrieved account details.</p>
                      <hr className="border-gray-100 mb-6" />
                      <table className="border border-gray-200 w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">ID</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.id}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">Provider ID</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.providerId}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">Name</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.name}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">Username</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.display}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">Created</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.createdAt}</td>
                          </tr>
                          <tr>
                            <th className="w-1/4 text-left p-2 border-r border-gray-200">Updated</th>
                            <td className="w-3/4 p-2 text-gray-500">{data?.updatedAt}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
    </PageLayout>
  </div>
}

// Exports
// ========================================================
export default UserPage;