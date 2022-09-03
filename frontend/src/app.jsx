import { ReactLocation, Router } from "@tanstack/react-location";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckLogin from "/src/components/authentication/check-login";

import CheckLogout from "/src/components/authentication/check-logout";
import Layout from "/src/components/layouts/layout";
import Error from "/src/components/shared/error";
import Home from "/src/pages/home";
import Login from "/src/pages/login";
import Register from "/src/pages/register";
import UserCourseDetail from "/src/pages/user-course-detail";
import UserCourseTest from "/src/pages/user-course-test";
import UserInfo from "/src/pages/user-info";
import UserLessonDetail from "/src/pages/user-lesson-detail";
import UserQuestionDetail from "/src/pages/user-question-detail";

const queryClient = new QueryClient();
const location = new ReactLocation();

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user/",
        element: <UserInfo />,
      },
      {
        path: "/login/",
        element: (
          <CheckLogout>
            <Login />
          </CheckLogout>
        ),
      },
      {
        path: "/register/",
        element: (
          <CheckLogout>
            <Register />
          </CheckLogout>
        ),
      },
      {
        path: "/courses/:courseId",
        children: [
          {
            path: "/",
            element: <UserCourseDetail />,
          },
          {
            path: "/test/",
            element: <UserCourseTest />,
          },
        ],
      },
      {
        path: "/lessons/:lessonId/",
        element: (
          <CheckLogin>
            <UserLessonDetail />
          </CheckLogin>
        ),
      },
      {
        path: "/questions/:questionId/",
        element: (
          <CheckLogin>
            <UserQuestionDetail />
          </CheckLogin>
        ),
      },
      {
        path: "/admin",
        children: [
          {
            path: "/",
          },
          {
            path: "/courses/:courseId/",
          },
          {
            path: "/lessons/:lessonId/",
          },
          {
            path: "/questions/:questionId/",
          },
        ],
      },
      {
        element: <Error text="Invalid route" />,
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
