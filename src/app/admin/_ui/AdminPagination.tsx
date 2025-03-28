import { Button } from "@/components/ui/button";

interface AdminPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function AdminPagination({ totalPages, currentPage, setCurrentPage }: AdminPaginationProps) {
  return (
    totalPages > 1 && (
      <div className="flex justify-between items-center mt-6">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="rounded-full bg-pink-600 hover:bg-pink-700 text-white"
        >
          Anterior
        </Button>
        <p className="text-gray-600 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </p>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="rounded-full bg-pink-600 hover:bg-pink-700 text-white"
        >
          Próxima
        </Button>
      </div>
    )
  );
}