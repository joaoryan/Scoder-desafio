import suricatoLoading from "@/img/suricato-loading.png";
import Image from "next/image";

interface LoadingSpinnerProps {
    size?: number; // Tamanho do spinner
    imageSize?: number; // Tamanho da imagem
    text?: string; // Texto opcional abaixo da imagem
}

export default function LoadingSpinner({
    size = 24,
    imageSize = 80,
    text,
}: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center gap-0">
            {/* Imagem com texto abaixo */}
            <div className="flex flex-row items-center">
                <Image
                    src={suricatoLoading}
                    alt="Loading Image"
                    width={imageSize}
                    height={imageSize}
                    className="object-contain"
                />
                <div
                    className="animate-spin rounded-full border-4"
                    style={{
                        width: size,
                        height: size,
                        borderColor: "#7045FF transparent #282262 transparent",
                    }}
                />
            </div>
            {text && (
                <span className="text-white text-xl font-semibold mt-2 text-center">
                    {text}
                </span>
            )}
            {/* Spinner */}

        </div>
    );
}
