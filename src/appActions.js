export const toggleSideNav = () => {
    if (document.body.classList.contains('sb-nav-fixed')) {
        document.body.classList.remove('sb-nav-fixed');
        document.body.classList.add('sb-sidenav-toggled');
    } else {
        document.body.classList.remove('sb-sidenav-toggled');
        document.body.classList.add('sb-nav-fixed');
    }
};
