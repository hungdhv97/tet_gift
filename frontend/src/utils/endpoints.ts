export const ENDPOINTS = {
    GET: {
        VESSEL: (vesselId: number) => `api/vessels/vessels/${vesselId}/`,
        VESSELS: `api/vessels/vessels/`,
        PRODUCTS: `api/products/products/`,
        RELATED_PRODUCT: (productId: number) =>
            `api/products/products/related/${productId}/products/`,
        PRODUCT_SIZES: `api/products/sizes/`,
        PRODUCT_COLORS: `api/products/colors/`,
        PRODUCT_STYLES: `api/products/styles/`,
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
        ADD_CART_ITEM: `api/carts/cart-items/`,
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
