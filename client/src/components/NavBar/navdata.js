export const navData = (user) => {
  if (user === undefined)
    return [
      { name: 'Home', href: '/' },
      { name: 'Sign In', href: '/users/signin' },
      { name: 'Sign Up', href: '/users/signup' },
    ];
  if (user && user.data.role === 'user') {
    return [
      { name: 'Home', href: '/' },
      {
        name: `${user.data.name || ' My Account'}`,
        href: '/account',
        menu: [
          { name: 'My Account', href: '/account' },
          { name: 'Orders', href: '/account/orders' },
          { name: 'Wishlist', href: '/account/wishlist' },
          { name: 'Notifications', href: '/account/notifications' },
        ],
      },
    ];
  } else {
    return [
      {
        name: `${user.data.name || ' My Account'}`,
        href: '/admin-account',
        menu: [
          { name: 'My Account', href: '/admin-account' },
          { name: 'Notifications', href: '/admin-account/notifications' },
        ],
      },
      { name: 'Dashboard', href: '/admin/dashboard' },
      { name: 'Products', href: '/admin/products' },
      { name: 'Categories', href: '/admin/categories' },
      { name: 'Orders', href: '/orders' },
    ];
  }
};
