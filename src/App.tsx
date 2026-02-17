import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/queryClient'
import NavigationTracker from '@/lib/navigationTracker.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/pageNotFound';
import { AuthProvider, useAuth } from '@/lib/authContext.js';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Toaster } from './components/ui/sonner';
import { pagesConfig } from './pages.config.js';



const { Pages, Layout } = pagesConfig;
// const mainPageKey = mainPage ?? Object.keys(Pages)[0];
// const MainPage = mainPageKey ? Pages[mainPageKey as keyof typeof Pages] : <></>;




type LayoutWrapperProps = {
  children: React.ReactNode;
  currentPageName: string;
}




const LayoutWrapper = ({ children, currentPageName }: LayoutWrapperProps) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;


const AuthenticatedApp = () => {
  const { isLoadingAuth, authError, navigateToLogin } = useAuth();

  const mainPageKey = pagesConfig.mainPage ?? Object.keys(Pages)[0];
  const MainPage = Pages[mainPageKey as keyof typeof Pages];

  // Show loading spinner while checking app public settings or auth
  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />

      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path.toLowerCase()}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
