import { http, HttpHandler, HttpResponse } from 'msw';

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

const successfulLogin: HttpHandler = http.post('http://127.0.0.1:3000/users/authenticate', async ({request }) => {
  const body = await request.json()
    return HttpResponse.json({
      message: "Authentication successful",
      token: "example-token1",
      username: "example user",
      body
    }, { status: 201 });
});


export const Handlers = [
  successfulUserSignup,
  emailInUse,
  successfulLogin,

];

