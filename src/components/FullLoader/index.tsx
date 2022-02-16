// Imports
// ========================================================
import Loader from "../Loader";

// Component
// ========================================================
const FullLoader = ({ darkMode = false }) => <div className="bg-white inset-0 fixed flex justify-center items-center">
  <Loader darkMode={darkMode} />
</div>;

// Exports
// ========================================================
export default FullLoader;