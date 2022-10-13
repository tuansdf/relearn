export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

// auth
export interface AuthLoginDto {
  username: string;
  password: string;
}
export interface AuthRegisterDto {
  email: string;
  username: string;
  password: string;
}

// course
export interface ICourse {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateCourseDto {
  title?: string;
  description?: string;
}
export interface CreateCourseDto {
  title: string;
  description: string;
}

// lesson
export interface ILesson {
  _id: string;
  title: string;
  description: string;
  course: string | ICourse;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateLessonDto {
  title?: string;
  description?: string;
}
export interface CreateLessonDto {
  title: string;
  description: string;
}

// question
export interface IAnswer {
  _id: string;
  text: string;
  isCorrect: boolean;
}
export interface CreateAnswerDto {
  text: string;
  isCorrect: boolean;
}
export interface IQuestion {
  _id: string;
  text: string;
  description: string;
  answers: IAnswer[];
  lesson: string | ILesson;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateQuestionDto {
  text?: string;
  description?: string;
  answers?: CreateAnswerDto[];
}
export interface CreateQuestionDto {
  text: string;
  description: string;
  answers: CreateAnswerDto[];
}

// comment
export interface IComment {
  _id: string;
  text: string;
  author: string | IUser;
  question: string | IQuestion;
  createdAt: string;
  updatedAt: string;
}
export interface CreateCommentDto {
  text: string;
  authorId: string;
}

// course
export interface ICourse {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// test result
export interface ITestResult {
  _id: string;
  user: IUser;
  course: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}
export interface CreateTestResultDto {
  userId: string;
  score: number;
}

// error
export interface IError {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}
