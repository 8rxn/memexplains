export interface Meme {
  id: string;
  image: string;
  prompt: string;
  upvotes: number;
  upvoted: string[];
  userId: string;
  userImage: string;
}
