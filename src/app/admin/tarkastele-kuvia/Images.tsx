import { ImageProof as ImageProofType } from "@/types/commonTypes";
import ImageProof from "./ImageProof";

interface ImagesProps {
    data: ImageProofType[] | ImageProofType | undefined
}

const Images = ({ data }: ImagesProps) => {

    if (!data) return (
        <h1>Kuvia ei löytynyt.</h1>
    );

    return (
        <div className="flex flex-col sm:max-w-xl">
            {Array.isArray(data) ? data.map((image: ImageProofType, index: number) => (
                <div className="max-w-1/5" key={index}>
                    <p>{image.fileName}</p>
                    <ImageProof src={image.image} />
                </div>
            )) : (
                <div>
                    <p>{data.fileName}</p>
                    <ImageProof src={data.image} />
                </div>
            )}
        </div>
    )
}

export default Images;