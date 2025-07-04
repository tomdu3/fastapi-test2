import {z} from 'zod';


export const AuthorSchema = z.object({
    id: z.number(),
    name: z.string().min(3).max(100),
    bio: z.string().nullable(),
});

export const BookSchema = z.object({
    id: z.number(),
    title: z.string().min(3).max(100),
    genre: z.string().min(3).max(100),
    year: z.number(),
    // if input is a string and needs to be converted to a number-> z.string().transform(str => parseInt(str)),
    edition: z.number().min(1),
    author: AuthorSchema
})

export type Author = z.infer<typeof AuthorSchema>;
export type Book = z.infer<typeof BookSchema>;