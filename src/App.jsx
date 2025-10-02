import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Applayout from './layouts/Applayout'
import LandingPage from './pages/LandingPage'
import JobListing from './pages/JobListing'
import Onboarding from './pages/Onboarding'
import PostJobs from './pages/PostJobs'
import MyJobs from './pages/MyJobs'
import Job from './pages/Job'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/ProtectedRoute'
import SavedJob from './pages/SavedJob'

const routes = [
  {
    element: <Applayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/jobs',
        element: <JobListing />
      },
      {
        path: '/onboarding',
        element: <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>

      },
      {
        path: '/post-jobs',
        element: <ProtectedRoute>
          <PostJobs />
        </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element: <ProtectedRoute>
          <MyJobs />
        </ProtectedRoute>
      },
      {
        path: '/saved-jobs',
        element: <ProtectedRoute>
          <SavedJob />
        </ProtectedRoute>
      },
      {
        path: '/job/:id',
        element: <Job />
      },
    ]
  }
]

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
}
)

function App() {
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  </ThemeProvider>
}

export default App




