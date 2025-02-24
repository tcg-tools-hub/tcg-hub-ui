import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { StockTableMagicCards, StockTableResponse } from "@/lib/types/stock-table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import SkeletonStock from "./skeleton-stock"
import { Button } from "@/components/ui/button"
import { formatToCurrency } from "@/lib/formatters/currency"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export const columns: ColumnDef<StockTableMagicCards>[] = [
    {
        accessorKey: "nameEn",
        header: "Nome",
    },
    {
        accessorKey: "stockCount",
        header: "Quantidade",
    },
    {
        accessorKey: "price",
        header: "Preço",
        cell: ({ row }) => {
            const formatted = formatToCurrency(row.getValue("price"))
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "leaguePrice",
        header: "Preço na Liga",
        cell: ({ row }) => {
            const formatted = formatToCurrency(row.getValue("leaguePrice"))
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "leaguePriceLastUpdate",
        header: "Última atualização da Liga",
        cell: ({ row }) => {
            if (!row.getValue("leaguePriceLastUpdate")) {
                return <div className="font-medium">Nunca</div>
            }
            const date = new Date(row.getValue("leaguePriceLastUpdate"));

            // Formata a data e hora usando Intl.DateTimeFormat
            const formatter = new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit', // Usa apenas os dois últimos dígitos do ano
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // Usar formato 24 horas
            });

            const formatted = formatter.format(date);

            return <div className="font-medium">{formatted}</div>
        },
    },
]

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtre por nome..."
                    value={(table.getColumn("nameEn")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nameEn")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próxima
                </Button>
            </div>
        </div>
    )
}

const Stock = () => {

    const [gameStoreCards, setGameStoreCards] = useState<StockTableResponse>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = sessionStorage.getItem("email");

                if (!email) {
                    throw new Error("Email não encontrado no sessionStorage");
                }

                const searchParams = new URLSearchParams({
                    email
                }).toString();

                const url = `/api/cards?${searchParams}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar dados");
                }

                const data = await response.json() as StockTableResponse;
                setGameStoreCards(data)
            } catch (error) {
                console.error("Erro:", error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <SkeletonStock />
            ) : (
                gameStoreCards?.users.map((user, userIndex) => (
                    <div key={userIndex}>
                        {user.gameStores.map((gameStore, storeIndex) => (
                            <div key={storeIndex}>
                                <h2 className="mb-2 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4x">{gameStore.name}</h2>
                                <p className="text-balance text-sm text-muted-foreground">Preço mínimo aceitável: {formatToCurrency(String(gameStore.minAcceptablePrice))}</p>
                                <p className="text-balance text-sm text-muted-foreground">Total de cartas: {gameStore.magicCardsRegistered}</p>
                                <Separator className="my-4" />
                                <DataTable
                                    columns={columns}
                                    data={gameStore?.magicCards}
                                />
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default Stock;