type CarouselImage = {
    id: number;
    title: string;
    image: string;
    description: string;
    order: number;
}

type Video = {
    id: number;
    title: string;
    video_url: string | null;
    video_file: string | null;
    description: string;
}

type Introduction = {
    id: number;
    title: string;
    content: string;
}

type AboutPageResponse = {
    carousel_images: CarouselImage[];
    videos: Video[];
    introduction: Introduction;
}
