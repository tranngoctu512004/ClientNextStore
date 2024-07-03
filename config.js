import { z } from "zod";
const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});
const configProject = configSchema.safeParse({
  // eslint-disable-next-line no-undef
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

if (!configProject.success) {
  throw new Error("Các giá trị khai báo trong env không đúng");
}
const envConfig = configProject.data;

export default envConfig;
