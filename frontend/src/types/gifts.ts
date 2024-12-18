type GiftImageResponse = {
    id: number;
    image: string;
    created_at: string;
};

type GiftResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
    images: GiftImageResponse[];
    created_at: string;
    updated_at: string;
};