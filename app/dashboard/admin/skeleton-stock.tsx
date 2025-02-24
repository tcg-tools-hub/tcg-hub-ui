import { Skeleton } from "@/components/ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

const SkeletonTable = () => {
    return (
        <div>
            {/* Skeleton para o Input de filtro */}
            <div className="flex items-center py-4">
                <Skeleton className="h-10 w-[300px]" /> {/* Simula o Input */}
            </div>

            {/* Skeleton para a tabela */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array.from({ length: 4 }).map((_, index) => ( // 4 colunas
                                <TableHead key={index}>
                                    <Skeleton className="h-4 w-[100px]" /> {/* Simula os cabeçalhos da tabela */}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, rowIndex) => ( // 5 linhas
                            <TableRow key={rowIndex}>
                                {Array.from({ length: 4 }).map((_, cellIndex) => ( // 4 células por linha
                                    <TableCell key={cellIndex}>
                                        <Skeleton className="h-4 w-[100px]" /> {/* Simula o conteúdo das células */}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const SkeletonStock = () => {
    return (
        <div>
            {/* Skeleton para o título (h2) */}
            <Skeleton className="h-8 w-[200px] mb-4" /> {/* Simula o h2 */}

            {/* Skeleton para o Separator */}
            <Skeleton className="h-[1px] w-full my-4" /> {/* Simula o Separator */}

            {/* Skeleton para a tabela */}
            <SkeletonTable />
        </div>
    );
};

export default SkeletonStock;