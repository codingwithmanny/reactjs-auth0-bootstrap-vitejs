// Imports
// ========================================================
import Nav from "../../components/Nav";

// Page
// ========================================================
const PageLayout: React.FC = ({ children }) => {
  // Render
  return <div>
    <Nav />
    <main>
      {children}
    </main>
  </div>
};

// Exports
// ========================================================
export default PageLayout;