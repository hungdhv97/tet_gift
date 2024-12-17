export const ENDPOINTS = {
    GET: {
        VESSEL: (vesselId: number) => `api/vessels/vessels/${vesselId}/`,
        VESSELS: `api/vessels/vessels/`,
        POSITION_HISTORY: `api/tracking/position-history/`,
        NEWS:
            `api/news/news-posts/`,
        NEWS_POST: (newsId: number) => `api/news/news-posts/${newsId}/`,
        ABOUT_PAGE: `api/introduction/about-data/`,
        LINKS: `api/news/links/`,
        PAGED_PRODUCT: (params: string) =>
            `api/products/products/filter/products/?${params}`,
        PAGED_ORDER: (params: string) => `api/orders/orders/filter/?${params}`,
        CATEGORY: (categorySlug: string) => `api/categories/${categorySlug}/`,
        CATEGORIES: `api/categories/`,
        CURRENT_USER: `api/users/me/`,
        WISHLIST_FOR_USER: `api/wishlists/current_wishlist/`,
        META_INFO: `api/metas/meta_info/`,
        RECEIVERS_FOR_USER: `api/receivers/receivers/`,
        PAGED_RECENTLY_VIEWED: (params: string) =>
            `api/recently-viewed/recently-viewed/?${params}`,
        ORDER: (orderId: number) => `api/orders/orders/${orderId}/`,
    },
    POST: {
        UPDATE_POSITION: `api/tracking/update-position/`,
        SYNCHRONIZE_CART: `api/carts/synchronize-cart/`,
        ADD_VESSEL: `api/vessels/vessels/`,
        LOGIN: `api/users/login/`,
        REGISTER: `api/auths/registration/`,
        CONFIRM_EMAIL: `api/auths/registration/verify-email/`,
        PASSWORD_RESET: `api/auths/password/reset/`,
        CHANGE_PASSWORD: `api/auths/password/change/`,
        PASSWORD_RESET_CONFIRM: `api/auths/password/reset/confirm/`,
        SOCIAL_LOGIN: `api/auths/social/login/`,
        ADD_TO_WISHLIST: `api/wishlists/add_product/`,
        REMOVE_FROM_WISHLIST: `api/wishlists/remove_product/`,
        ADD_RECEIVER: `api/receivers/receivers/`,
        ADD_RECENTLY_VIEWED: `api/recently-viewed/recently-viewed/`,
    },
    DELETE: {
        REMOVE_CART_ITEM: (cartItemId: number) =>
            `api/carts/cart-items/${cartItemId}/`,
        REMOVE_VESSEL: (vesselId: number) => `api/vessels/vessels/${vesselId}/`,
        REMOVE_RECEIVER: (receiverId: number) =>
            `api/receivers/receivers/${receiverId}/`,
    },
    PATCH: {
        UPDATE_CART_ITEM_QUANTITY: (cartItemId: number) =>
            `api/carts/cart-items/${cartItemId}/`,
        UPDATE_VESSEL: (vesselId: number) => `api/vessels/vessels/${vesselId}/`,
        UPDATE_PROFILE: `api/users/profile/update/`,
        UPDATE_USERNAME: `api/auths/user/`,
        UPDATE_RECEIVER: (receiverId: number) =>
            `api/receivers/receivers/${receiverId}/`,
    },
};
