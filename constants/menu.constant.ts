export const MENUS = [
    {
        link_url: '/',
        title: {
            vi: 'Trang chủ',
            en: 'Home page'
        }
    },
    {
        link_url: '/product',
        title: {
            vi: 'Sản phẩm',
            en: 'Product'
        }
    },
    {
        link_url: '/blog',
        title: {
            vi: 'Bài viết',
            en: 'Posts'
        }
    },
    {
        link_url: '/library',
        title: {
            vi: 'Thư viện',
            en: 'Library'
        }
    },
    {
        link_url: '/about-us',
        title: {
            vi: 'Về chúng tôi',
            en: 'About us'
        }
    }
]

export const BOTTOM_NAVBAR_ITEMS = [
    {
        icon: '/images/icons/bottom-navbar/ic-home.svg',
        icon_active: '/images/icons/bottom-navbar/ic-home-active.svg',
        link_url: '/',
        title: {
            vi: 'Trang chủ',
            en: 'Home page'
        }
    },
    {
        icon: '/images/icons/bottom-navbar/ic-product.svg',
        icon_active: '/images/icons/bottom-navbar/ic-product-active.svg',
        link_url: '/product',
        title: {
            vi: 'Sản phẩm',
            en: 'Product'
        }
    },
    {
        icon: '/images/icons/bottom-navbar/ic-bell.svg',
        icon_active: '/images/icons/bottom-navbar/ic-bell-active.svg',
        link_url: '/notification',
        has_counter: true,
        title: {
            vi: 'Thông báo',
            en: 'Notification'
        }
    },
    {
        icon: '/images/icons/bottom-navbar/ic-user.svg',
        icon_active: '/images/icons/bottom-navbar/ic-user-active.svg',
        link_url: '/profile',
        auth: true,
        title: {
            vi: 'Tài khoản',
            en: 'Account'
        }
    }
]