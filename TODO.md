# AI SDK Registration Chatbot Setup Guide

## Prerequisites

**Important:** You must add your credit card to use Vercel AI SDK.

## Initial Setup

### 1. Database Setup (Neon)

1. Go to [Neon](https://neon.tech)
2. Create a new project with your desired name
3. Connect to your database and copy the connection string
4. Create a `.env` file in your project root and add:
```env
   DATABASE_URL="your_neon_connection_string_here"
```

### 2. Package Manager Setup

Install pnpm globally:
```bash
npm install -g pnpm
```

### 3. Install Dependencies
```bash
pnpm add ai @ai-sdk/react zod
pnpm dlx shadcn@latest add @ai-elements/all
```

### 4. Get AI Gateway API Key

1. Go to [ai-sdk.dev](https://ai-sdk.dev/)
2. Click on **AI Gateway** link
3. Click **Get an API Key** → **Get started**
4. Sign in with your Vercel account
5. Copy your API key and add it to `.env`:
```env
   AI_GATEWAY_API_KEY="your_api_key_here"
```

## Project Configuration

### 1. Create Chat Interface

**File:** `app/page.tsx`

Copy the chatbot example code from: [AI SDK Elements - Chatbot Example](https://ai-sdk.dev/elements/examples/chatbot)

### 2. Create API Route

**File:** `app/api/chat/route.ts`

1. Copy the base code from: [AI SDK Elements - Chatbot Example](https://ai-sdk.dev/elements/examples/chatbot)

2. Update the model from [AI SDK Introduction](https://ai-sdk.dev/docs/introduction):
```typescript
   model: "anthropic/claude-sonnet-4.5"
```

3. Replace the tools section with the registration tool from [AI SDK Tools Documentation](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling):
```typescript
   tools: {
     registerUser: tool({
       description: 'Get the User Information and Creates a user in the system',
       inputSchema: z.object({
         name: z.string().describe("The user fullname"),
         phone: z.string().describe("The user phone number"),
         email: z.string().describe("The user email"),
       }),
       execute: async ({ name, phone, email }) => {
         // Check if user exists
         let user = await db.user.findUnique({
           where: {
             email: email,
           },
         });

         // Create the user if they don't exist
         if (!user) {
           user = await db.user.create({
             data: {
               email, 
               name, 
               phone
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
   }
```

### 3. System Prompts

**Initial Prompt (Basic):**
```
You are a helpful assistant that can answer questions and help with tasks.
```

**Registration Prompt (Recommended):**
```
You are a helpful assistant named Zig that helps users register in the Database. 

Welcome the user with a greeting and ask them to provide:
- Email Address
- Phone Number
- Full Name

Only proceed to call the Register User tool when you have collected all required information.

Speak to the user in a warm, welcoming tone and always be respectful.
```

## Database Schema

### 1. Update Prisma Schema

**File:** `prisma/schema.prisma`
```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String   
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 2. Run Migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## UI Enhancement (Optional)

### Create Success Card

Use [v0.dev](https://v0.dev) to generate a registration success card:

**Prompt:**
```
I want to create a card to display a successful user registration. 
The card should show:
- Success message
- User ID
- Name
- Email
- Phone

Make it clean, sleek, and compact.
```

## Testing

To test the registration flow, start with:
```
Hello, I want to register
```

The assistant will guide you through the registration process.

## Environment Variables Summary

Your `.env` file should contain:
```env
DATABASE_URL="your_neon_connection_string"
AI_GATEWAY_API_KEY="your_ai_gateway_key"
```

## Troubleshooting

- Ensure all dependencies are installed with `pnpm install`
- Verify your database connection string is correct
- Check that Prisma migrations ran successfully
- Confirm your AI Gateway API key is valid

---

**Need Help?** Contact: [marioagbanobi@gmail.com](mailto:marioagbanobi@gmail.com)