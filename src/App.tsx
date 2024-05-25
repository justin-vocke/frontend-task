import { StudentList } from "./components/Student/Students";
import { Create } from "./components/Student/Create";
import { Home } from "./components/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Update } from "./components/Student/Update";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { Button, Container } from "react-bootstrap";
import { IdTokenData } from "./components/DataDisplay";
import { PageLayout } from "./components/PageLayout";

interface Props {
  instance: PublicClientApplication;
}
/**
 * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
 * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
 * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const MainContent = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <Container>
            <IdTokenData idTokenClaims={activeAccount.idTokenClaims} />
          </Container>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          className="signInButton"
          onClick={handleRedirect}
          variant="primary"
        >
          Sign up
        </Button>
      </UnauthenticatedTemplate>
    </div>
  );
};
const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/update/:id" element={<Update />} />
      {/* <Route path="/delete/:id" element={<Delete />} /> */}
    </Routes>
  );
};
/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }: Props) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <Pages />
      </PageLayout>
    </MsalProvider>
  );
};

export default App;

// function App({ instance }: Props) {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/students" element={<Students />} />
//         <Route path="/create" element={<Create />} />
//         <Route path="/update/:id" element={<Update />} />
//         {/* <Route path="/update/:id" element={<Update />} />
//         <Route path="/delete/:id" element={<Delete />} />  */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
