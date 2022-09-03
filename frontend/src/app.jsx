import { ReactLocation, Router } from "@tanstack/react-location";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "/src/components/layouts/layout";
import Home from "/src/pages/home";
import Login from "/src/pages/login";
import Register from "/src/pages/register";
import UserCourseDetail from "/src/pages/user-course-detail";
import UserCourseTest from "/src/pages/user-course-test";
import UserLessonDetail from "/src/pages/user-lesson-detail";
import UserQuestionDetail from "/src/pages/user-question-detail";

const location = new ReactLocation();
const queryClient = new QueryClient();

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/courses/:courseId",
        children: [
          {
            path: "/",
            element: <UserCourseDetail />,
          },
          {
            path: "/test",
            element: <UserCourseTest />,
          },
        ],
      },
      {
        path: "/lessons/:lessonId",
        element: <UserLessonDetail />,
      },
      {
        path: "/questions/:questionId",
        element: <UserQuestionDetail />,
      },
      {
        path: "/admin",
        children: [
          {
            path: "/",
          },
          {
            path: "/courses/:courseId",
          },
          {
            path: "/lessons/:lessonId",
          },
          {
            path: "/questions/:questionId",
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router routes={routes} location={location} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
