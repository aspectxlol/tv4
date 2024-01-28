import { type Post } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Card({
  post
}: {
  post: Post
}) {
  const router = useRouter()
  const navigate = async (to: string) => {
    await router.push(`/blog/${to}`)
  }

  return (
    <div className="grid grid-cols-3 max-w-lg h-48 border-solid shadow m-2 p-2 gap-4 grid-flow-col hover:shadow-xl" role="link" key={post.id} onClick={() => navigate(post.id)}>
      <Image src={post.image} alt={post.title} width={1080} height={1080} className="object-cover w-full h-full rounded col-span-1 object-center" />
      <div className="col-span-2">
        <h1 className="font-bold">{post.title}</h1>
        <p className="truncate text-ellipsis">{post.description}</p>
      </div>
    </div>
  )
}