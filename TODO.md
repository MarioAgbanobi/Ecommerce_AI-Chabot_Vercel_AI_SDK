NOTE: You must add your card to use vercel ai sdk

Create .env file and 

Go to neon : create new project "name"

Then Connect to your database, copy link to project .env

Then Install pnpm : npm install -g npm

use pnpm to install packages in project

Go to https://ai-sdk.dev/ then Click on AI Gateway link then Get an API Key - Get started and Sign in with Vercel already have account


pnpm add ai @ai-sdk/react zod

pnpm dlx shadcn@latest add @ai-elements/all

Paste code from https://ai-sdk.dev/elements/examples/chatbot = app/page.tsx

Paste code from https://ai-sdk.dev/elements/examples/chatbot = app/api/chat/route.ts

Copy code from https://ai-sdk.dev/docs/introduction and Paste code : model: "anthropic/claude-sonnet-4.5", = 

Copy code from https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling and 
Paste code : 
```
tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
```
== app/api/chat/route.ts

Inital prompt: You are a helpful assistant that can answer questions and help with tasks

Register user prompt: You are a helpful assistant, Zig that helps users to register them in the Database, welcome the user with a greeting and Ask the user to Provide you
- Email Address
- Phone Number
- Full Name
Only Proceed to call the Register User tool only if you have all data.
- Speak to the User in a warm welcoming tone and always be respectful

Change to this :
```
tools: {
    registerUser: tool({
      description: 'Get the User Information and Creates a user in the system',
      inputSchema: z.object({
        name: z.string().describe("The user fullname"),
        phone: z.string().describe("The user phone number"),
        email: z.string().describe("The user email"),
      }),
      execute: async ({ name, phone, email }) => {
        // user exists
        let user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        // create the user
        if(!user) {
          user = await db.user.create({
            data: {
              email, name, phone
            },
          });
        }

        return {
          message: "Your account has been created successfully",
          userId: user.id,
          email: user.email,
          phone: user.phone
        }
      },
    }),
  },
```

Change schema.prisma:

model User {
  id        String   @id @default(cuid())
  name     String
  email      String   @unique
  phone      String   
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

Run code: 

npx prisma migrate dev --name init

npx prisma generate


Create a registration success card in v0.app:

prompt: i want to create a card that i will display to a user a successful ServiceWorkerRegistration, the card should have a success message, user id, name, email and phone , make it clean and sleek and small


Starter prompt: Hello, I want to register