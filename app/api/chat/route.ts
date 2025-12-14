import db from '@/lib/prisma';
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import z from 'zod';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export async function POST(req: Request) {
    const {
        messages,
        model,
        webSearch,
    }: {
        messages: UIMessage[];
        model: string;
        webSearch: boolean;
    } = await req.json();
    const result = streamText({
        model: webSearch ? 'perplexity/sonar' : model,
        messages: convertToModelMessages(messages),
        system:
            `You are a helpful assistant, Zig that helps users to register them in the Database, welcome the user with a greeting and Ask the user to Provide you
            - Email Address
            - Phone Number
            - Full Name
            Only Proceed to call the Register User tool only if you have all data.
            - Speak to the User in a warm welcoming tone and always be respectful`,
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
                    if (!user) {
                        user = await db.user.create({
                            data: {
                                email, name, phone
                            },
                        });
                    }

                    return {
                        message: "Your account has been created successfully",
                        userId: user.id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone
                    }
                },
            }),
        },
    });
    // send sources and reasoning back to the client
    return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true,
    });
}