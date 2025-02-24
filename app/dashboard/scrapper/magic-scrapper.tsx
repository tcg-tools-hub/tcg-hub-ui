import { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { FileText, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const getFileIcon = (fileType: string) => {
  if (fileType === "text/csv")
    return <FileText className="text-green-500" size={20} />;
  if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return <FileText className="text-blue-500" size={20} />;
  if (fileType === "application/vnd.ms-excel")
    return <FileText className="text-blue-500" size={20} />;
  return <FileText className="text-gray-500" size={20} />;
};

const MagicScrapper = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async () => {
    if (files.length === 0) {
      toast.error("Nenhum arquivo selecionado!");
      return;
    }

    setIsLoading(true)
    // Processa cada arquivo
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/csv-parser', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Erro ao enviar o arquivo');
        }

        const { data } = await response.json();

        if (data) {
          await fetch('/api/upload', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cardsList: data, gameStoreId: Number(sessionStorage.getItem("gameStoreId")) })
          })

          toast.success("Cartas salvas na base de dados!")
        }
        console.log('Dados processados:', data);
        toast.success(`Arquivo "${file.name}" processado com sucesso!`);
      } catch (error) {
        console.error('Erro:', error);
        toast.error(`Erro ao processar o arquivo "${file.name}".`);
      } finally {
        setIsLoading(false)
      }
    }
  };

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      toast.error("Por favor, envie apenas arquivos CSV!");
      return;
    }

    // Adiciona os arquivos aceitos ao estado
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // Aceita apenas arquivos CSV
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="text-sm font-medium text-green-600">
              Solte seus arquivos aqui!
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-600">
              Arraste e solte arquivos aqui ou{" "}
              <span className="font-semibold">
                clique para enviar
              </span>
              .
            </div>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Arquivos enviados
          </h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3 p-2 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <span className="text-sm text-gray-800 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
          <Button type="submit" className="w-full" onClick={handleFileUpload} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {/* Spinner */}
              Carregando...
            </>
          ) : (
            "Processar Arquivos"
          )}
        </Button>
        </div>
      )}
    </div>
  );
};

export default MagicScrapper;