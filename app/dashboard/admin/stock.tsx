import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { StockTableMagicCards, StockTableResponse } from "@/lib/types/stock-table"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"

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
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "leaguePrice",
        header: "Preço na Liga",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("leaguePrice"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    }
]

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
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
    )
}

const Stock = () => {

    const [gameStoreCards, setGameStoreCards] = useState<StockTableResponse>()

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
                console.log("Dados recebidos:", data);
            } catch (error) {
                console.error("Erro:", error);
            }
        };

        fetchData(); // Chama a função assíncrona
    }, []);

    return (
        <div>
            {gameStoreCards?.users.map((user, userIndex) => (
                <div key={userIndex}>
                    {user.gameStores.map((gameStore, storeIndex) => (
                        <div key={storeIndex}>
                            <h2>{gameStore.name}</h2>
                            <DataTable
                                columns={columns}
                                data={gameStore?.magicCards}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Stock;