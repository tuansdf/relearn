import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";

import CheckLogin from "./components/authentication/check-login";
import CheckLogout from "./components/authentication/check-logout";
import Layout from "./components/layouts/layout";
import Error from "./components/shared/error";
import AdminCourses from "./pages/admin/admin-courses";
import AdminLessons from "./pages/admin/admin-lessons";
import AdminQuestions from "./pages/admin/admin-questions";
import CourseLeaderboard from "./pages/course/course-leaderboard";
import UserCourseDetail from "./pages/course/user-course-detail";
import UserCourseTest from "./pages/course/user-course-test";

import Home from "./pages/home";
import UserLessonDetail from "./pages/lesson/user-lesson-detail";
import Login from "./pages/login";
import UserQuestionDetail from "./pages/question/user-question-detail";
import Register from "./pages/register";
import UserInfo from "./pages/user/user-info";

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
        element: (
          <CheckLogin>
            <UserInfo />
          </CheckLogin>
        ),
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
            element: (
              <CheckLogin>
                <UserCourseTest />
              </CheckLogin>
            ),
          },
          {
            path: "/leaderboard/",
            element: <CourseLeaderboard />,
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
        element: (
          <CheckLogin>
            <Outlet />
          </CheckLogin>
        ),
        children: [
          {
            path: "/courses",
            children: [
              {
                path: "/",
                element: <AdminCourses />,
              },
              {
                path: "/:courseId/lessons",
                element: <AdminLessons />,
              },
            ],
          },
          {
            path: "/lessons/:lessonId/questions",
            element: <AdminQuestions />,
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
