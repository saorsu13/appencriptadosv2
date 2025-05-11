// src/api/posts.ts
import apiv2 from "@/api/apiv2";

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    _acf_changed: boolean;
    inline_featured_image: boolean;
    footnotes: string;
  };
  categories: number[];
  tags: any[];
  acf: any;
  _links: any;
}

export interface PostImage {
  guid: { rendered: string };
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiv2.get<Post[]>("posts");
  return response; // 👈 No .data
};

export const getPostById = async (id: string | number): Promise<Post> => {
  const response = await apiv2.get<Post>(`posts/${id}`);
  return response; // 👈 No .data
};

export const getPostImage = async (id: string | number): Promise<PostImage> => {
  const response = await apiv2.get<PostImage>(`media/${id}`);
  return response; // 👈 No .data
};
