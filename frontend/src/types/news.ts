type NewsContentResponse = {
    id: number;
    content_type: string;
    content_text: string | null;
    content_image: string | null;
    content_video: string | null;
    caption: string | null;
    order: number;
};

type NewsPostResponse = {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    contents: NewsContentResponse[];
};

type LinkResponse = {
    id: number;
    title: string;
    url: string;
};