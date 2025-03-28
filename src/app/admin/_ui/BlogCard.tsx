import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author_id: string;
  date: string;
  image: string;
  content: { type: string; text: string }[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface BlogCardProps {
  post: BlogPost;
  selectedItems: Set<string | number>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<string | number>>>;
  handleUpdateBlogStatus: (id: number, status: "approved" | "rejected") => void;
}

export default function BlogCard({ post, selectedItems, setSelectedItems, handleUpdateBlogStatus }: BlogCardProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem value={post.id.toString()}>
        <AccordionTrigger className="grid grid-cols-6 gap-4 items-center p-4 bg-pink-50 dark:bg-[#300d1b] rounded-2xl hover:bg-pink-100 dark:hover:bg-[#4A5568]">
          <div className="col-span-1">
            <Checkbox
              checked={selectedItems.has(post.id)}
              onCheckedChange={(checked) => {
                const newSelected = new Set(selectedItems);
                if (checked) newSelected.add(post.id);
                else newSelected.delete(post.id);
                setSelectedItems(newSelected);
              }}
            />
          </div>
          <div className="col-span-3 text-left">
            {post.title} ({post.status})
          </div>
          <div className="col-span-2 flex space-x-2">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-full"
              onClick={() => handleUpdateBlogStatus(post.id, "approved")}
            >
              Aprovar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
              onClick={() => handleUpdateBlogStatus(post.id, "rejected")}
            >
              Rejeitar
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-6 bg-white dark:bg-[#1a0a10] rounded-2xl border border-pink-100 dark:border-[#2D3748]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Detalhes do Post</h3>
              <Separator className="mb-4 bg-gray-200 dark:bg-[#4A5568]" />
              <p>
                <strong>Autor:</strong> {post.author_id}
              </p>
              <p>
                <strong>Data:</strong> {new Date(post.date).toLocaleDateString("pt-PT")}
              </p>
              <p>
                <strong>Criado em:</strong> {new Date(post.created_at).toLocaleDateString("pt-PT")}
              </p>
              <p>
                <strong>Conteúdo:</strong>
              </p>
              {post.content.map((c, idx) => (
                <p key={idx} className="text-gray-700 dark:text-gray-200">
                  {c.text}
                </p>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Imagem</h3>
              <Separator className="mb-4 bg-gray-200 dark:bg-[#4A5568]" />
              <Image src={post.image} alt={post.title} width={200} height={200} className="rounded-lg" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}