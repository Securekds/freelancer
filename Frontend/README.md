# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<motion.div
className = 'slide-in'
initial = {{scaleY : 0}}
animate = {{scaleY : 0}}
exit = {{scaleY : 1}}
transition = {{ duration : 1 ease : [0.22 , 1 , 0.36 ,1]}}
>

<motion.div
className = 'slide-out'
initial = {{scaleY : 1}}
animate = {{scaleY : 0}}
exit = {{scaleY : 0}}
transition = {{ duration : 1 ease : [0.22 , 1 , 0.36 ,1]}}
>

slide-in {
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100vh;
    background : #0f0f0f;
    transform-origin : bottom
}

slide-out {
    position : fixed;
    top : 0;
    left : 0;
    width : 100%;
    height : 100vh;
    background : #0f0f0f;
    transform-origin : top
}