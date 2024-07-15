// document.addEventListener('DOMContentLoaded', () => {
//     const navToggle = document.getElementById('navToggle');
//     const mobileNav = document.getElementById('mobileNav');

//     navToggle.addEventListener('click', () => {
//         // Toggle the menu visibility
//         mobileNav.classList.toggle('active');
//         // Toggle the rotation of the icon
//         navToggle.classList.toggle('open');
//     });

//         // Close the mobile menu when clicking outside of it
//         document.addEventListener('click', (e) => {
//             if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
//                 mobileNav.classList.remove('open');
//             }
//         });
// });

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');

    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        mobileNav.classList.toggle('active');
    });

    // Close the mobile menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !navToggle.contains(e.target)) {
            mobileNav.classList.remove('open');
        }
    });
});