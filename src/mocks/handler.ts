import { http, HttpHandler, HttpResponse } from 'msw';
import { randomMockQuizQuestions, sameCategoryQuizQuestions } from './mockQuizData';

// These functions mock and intercept API calls 
// Individual tests have individual partner functions

// Sign up handlers
const successfulUserSignup: HttpHandler = http.post('http://127.0.0.1:3000/users', async ({ request }) => {
    const body = await request.json()
      return HttpResponse.json({
        message: "User created", 
        token: 'example-token',
        body
      }, { status: 201 })
});

const emailInUse: HttpHandler = http.post('http://127.0.0.1:3000/users', async ({request}) => {
    const body = await request.json()
      return HttpResponse.json({
        message: 'Email already in use',
        body
      }, { status: 401 });
});

// Login handlers
const successfulLogin: HttpHandler = http.post('http://127.0.0.1:3000/users/authenticate', async ({request }) => {
  const body = await request.json()
    return HttpResponse.json({
      message: "Authentication successful",
      token: "example-token1",
      username: "example user",
      body
    }, { status: 201 });
});

const userNotFound: HttpHandler = http.post('http://127.0.0.1:3000/users/authenticate', async ({request }) => {
  const body = await request.json()
    return HttpResponse.json({
      message: "User not found",
      body
    }, { status: 404 });
});

const passwordDoesNotMatch: HttpHandler = http.post('http://127.0.0.1:3000/users/authenticate', async ({request }) => {
  const body = await request.json()
    return HttpResponse.json({
      message: "Invalid credentials",
      body
    }, { status: 401 });
});

const loginErrorThrown: HttpHandler = http.post('http://127.0.0.1:3000/users/authenticate', async ({request }) => {
  const body = await request.json()
    return HttpResponse.json({
      message: "Authentication failed",
      body
    }, { status: 400 });
});


// Questions handler
const createsRandomQuiz: HttpHandler = http.get('http://127.0.0.1:3000/questions', async () => { 
    return HttpResponse.json({
      questions: randomMockQuizQuestions
    }, { status: 200 });
});

const createsCategoryQuiz: HttpHandler = http.get('http://127.0.0.1:3000/questions', async ({request}) => { 
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  if (!category) {
    return HttpResponse.json({message: 'An error occurred'}, { status: 404 })
  }
    return HttpResponse.json({
      questions: sameCategoryQuizQuestions
    }, { status: 200 });
});


export const Handlers = [
  successfulUserSignup,
  emailInUse,
  successfulLogin,
  userNotFound,
  passwordDoesNotMatch,
  loginErrorThrown,
  createsRandomQuiz,
  createsCategoryQuiz
];

