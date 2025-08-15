# Portfolio

This repository contains the source code for my personal portfolio website.

## Features and Functionality

*   **Interactive 3D Cubes:** Engaging 3D cube animations on the hero section, providing a visually appealing introduction. Cube positions and rotations are dynamically adjusted based on screen size.
*   **Smooth Scrolling:** Utilizes `Lenis` and `GSAP ScrollTrigger` for smooth and visually appealing scrolling transitions across different sections.
*   **Dynamic Text Preloader:**  A preloader with dynamic text displaying greetings in different languages, powered by `motion/react` for smooth animations.
*   **Animated SVG Graphics:** SVG graphics with animated paths in the "About Me" section, triggered by scroll position.
*   **Project Showcase:** A project carousel showcasing various projects with image transitions and descriptions.
*   **Skills Section:** A comprehensive skills section featuring a grid layout with interactive highlighting.
*   **Contact Section:** A contact section with links to LinkedIn, GitHub, and email, featuring a flip-text effect on hover.
*   **Responsive Design:**  The website is designed to be responsive and adapt to different screen sizes, ensuring a consistent user experience across devices.

## Technology Stack

*   **Next.js:** A React framework for building server-rendered and static websites.
*   **React:** A JavaScript library for building user interfaces.
*   **GSAP (GreenSock Animation Platform):** A JavaScript library for creating high-performance animations.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Framer Motion:** A production-ready motion library for React.
*   **Lenis:** A JavaScript library for smooth scrolling.
*   **Lucide React:** A collection of beautiful and consistent icons for React.

## Prerequisites

Before running the application, ensure you have the following installed:

*   **Node.js:** Version 18 or higher is recommended.  You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** or **yarn:**  A package manager for JavaScript. npm is included with Node.js. Yarn can be installed globally using `npm install -g yarn`.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MrAnsif/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or, using yarn:

    ```bash
    yarn install
    ```

## Usage Guide

1.  **Run the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or, using yarn:

    ```bash
    yarn dev
    ```

    This will start the development server at `http://localhost:3000`.

2.  **Build for production:**

    Using npm:

    ```bash
    npm run build
    ```

    Or, using yarn:

    ```bash
    yarn build
    ```

    This will create an optimized build in the `.next` directory.

3.  **Start the production server:**

    Using npm:

    ```bash
    npm run start
    ```

    Or, using yarn:

    ```bash
    yarn start
    ```

    This will start the production server.  You may need to configure environment variables for production deployment.

## Configuration Details

### Cube Animations

The positions and rotations of the 3D cubes in the Hero section are configured in:

*   `app/components/CubesData.js`: Configuration for larger screens. Includes `initial` and `final` states for the cubes' `top`, `left`, `Z` position, `rotateX`, `rotateY`, and `rotateZ`.

    ```javascript
    export const CubesDatalg = {
        "cube-1": {
          initial: {
            top: -100,
            left: 44,
            Z: -35000,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          final: {
            top: 50,
            left: 15,
            rotateX: 360,
            rotateY: 360,
            rotateZ: 0,
            Z: 0
          }
        },
    // ... other cubes
    };
    ```

*   `app/components/CubesDataSm.js`: Configuration for smaller screens.

    ```javascript
    export const CubesDataSm = {
        "cube-1": {
          initial: {
            top: -45,
            left: 20,
            Z: -35000,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          },
          final: {
            top: 25,
            left: 25,
            rotateX: -360,
            rotateY: -360,
            rotateZ: 0,
            Z: 0
          }
        },
    // ... other cubes
    };
    ```

### Project Slides

The project slides and their corresponding image URLs are defined in:

*   `app/components/slides.js`

    ```javascript
    const slides = [
      {
        title: "1",
        image: "/images/img-prj (1).webp",
        url: "/projects_url.com"
      },
    // ... other slides
    ];

    export default slides;
    ```

### Project Slides 2

The project slides and their corresponding image URLs are defined in:

*   `app/components/prjSlides.js`

```javascript
const prjSlides = [
    {
        title: "1",
        image: "/images/prj (1).webp",
        description: "MERN stack doc project."
    },
    // ... other slides
];

export default prjSlides;
```

## Contributing Guidelines

Contributions are welcome! To contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main branch of this repository.

## License Information

No license has been specified for this repository.  All rights are reserved by the author.

## Contact/Support Information

For any questions or support, please contact:

Ansif Muhammed N N
ansifpta2003@gmail.com
[https://www.linkedin.com/in/ansif1/](https://www.linkedin.com/in/ansif1/)