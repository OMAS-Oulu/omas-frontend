import Image from "next/image";

interface ImageProps {
    src: string
}

const ImageProof = ({ src }: ImageProps) => {
    return (
        <Image alt="" className="max-w-1/5" src={getImageSource(src)} />
    )
}

const getImageSource = (data: string) => {
    const src = "data:image/jpeg;base64," + data;
    return src;
}

export default ImageProof;