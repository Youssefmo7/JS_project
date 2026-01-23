

/////  courses  /////
function generateCourses() {
  return [
    {
      id: 1,
      courseName: "Programming Fundamentals",
      description: "This course introduces the basics of programming and problem-solving. It focuses on building a strong foundation in logical thinking and writing clean, readable code.",
      category: "Programming",
      instructor: {
        name: "Ahmed Hassan",
        image: "instructors/ahmed.jpg"
      },
      price: 120,
      duration: "20 hours",
      content: [
        "Introduction to programming concepts and problem solving",
        "Understanding variables, data types, and memory",
        "Using conditions to control program flow",
        "Loops and iterations for repetitive tasks",
        "Functions and modular programming",
        "Debugging techniques and best practices"
      ],
      image: "courses/programming.jpg"
    },

    {
      id: 2,
      courseName: "Data Structures & Algorithms",
      description: "A comprehensive course covering essential data structures and algorithms with a focus on efficiency and real-world applications.",
      category: "Algorithms",
      instructor: {
        name: "Sara Mostafa",
        image: "instructors/sara.jpg"
      },
      price: 180,
      duration: "30 hours",
      content: [
        "Algorithm analysis and Big-O notation",
        "Arrays, linked lists, stacks, and queues",
        "Trees, binary search trees, and heaps",
        "Graph concepts and traversal algorithms",
        "Sorting and searching techniques",
        "Solving interview-style algorithm problems"
      ],
      image: "courses/dsa.jpg"
    },

    {
      id: 3,
      courseName: "Web Development",
      description: "Learn how to build modern, responsive websites from scratch using HTML, CSS, and JavaScript without frameworks.",
      category: "Web",
      instructor: {
        name: "Omar Khaled",
        image: "instructors/omar.jpg"
      },
      price: 150,
      duration: "25 hours",
      content: [
        "HTML structure and semantic elements",
        "CSS layouts, Flexbox, and responsiveness",
        "JavaScript fundamentals and DOM manipulation",
        "Handling user events and form validation",
        "Creating interactive UI components",
        "Building and deploying a complete website"
      ],
      image: "courses/web.jpg"
    },

    {
      id: 4,
      courseName: "Operating Systems",
      description: "This course explains how operating systems work internally, focusing on process management, memory, and file systems.",
      category: "Systems",
      instructor: {
        name: "Mohamed Ali",
        image: "instructors/mohamed.jpg"
      },
      price: 200,
      duration: "28 hours",
      content: [
        "Introduction to operating system concepts",
        "Processes, threads, and CPU scheduling",
        "Memory management and virtual memory",
        "Synchronization and deadlocks",
        "File systems and disk management",
        "Linux and Windows case studies"
      ],
      image: "courses/os.jpg"
    },

    {
      id: 5,
      courseName: "Databases",
      description: "Learn how to design, build, and manage databases efficiently using SQL and relational database concepts.",
      category: "Databases",
      instructor: {
        name: "Nour Adel",
        image: "instructors/nour.jpg"
      },
      price: 140,
      duration: "22 hours",
      content: [
        "Introduction to databases and data modeling",
        "Entity Relationship diagrams",
        "Writing SQL queries",
        "Joins, indexes, and optimization",
        "Database normalization",
        "Building database-driven applications"
      ],
      image: "courses/db.jpg"
    },

    {
      id: 6,
      courseName: "Computer Networks",
      description: "Understand how computers communicate over networks, covering protocols, architectures, and real networking scenarios.",
      category: "Networks",
      instructor: {
        name: "Khaled Samir",
        image: "instructors/khaled.jpg"
      },
      price: 160,
      duration: "24 hours",
      content: [
        "Networking fundamentals and models",
        "TCP/IP and OSI layers",
        "IP addressing and subnetting",
        "Routing and switching basics",
        "Network security fundamentals",
        "Real-world networking examples"
      ],
      image: "courses/networks.jpg"
    },

    {
      id: 7,
      courseName: "Software Engineering",
      description: "Learn how to design, develop, and maintain large-scale software systems using engineering principles.",
      category: "Engineering",
      instructor: {
        name: "Heba Youssef",
        image: "instructors/heba.jpg"
      },
      price: 170,
      duration: "26 hours",
      content: [
        "Software development life cycle",
        "Requirements analysis and documentation",
        "Design patterns and architecture",
        "Agile and Scrum methodologies",
        "Testing and quality assurance",
        "Maintaining and scaling software systems"
      ],
      image: "courses/se.jpg"
    },

    {
      id: 8,
      courseName: "Cyber Security Fundamentals",
      description: "An introduction to cyber security concepts, threats, and defensive techniques used in modern systems.",
      category: "Security",
      instructor: {
        name: "Youssef Magdy",
        image: "instructors/youssef.jpg"
      },
      price: 190,
      duration: "27 hours",
      content: [
        "Introduction to cyber security",
        "Common security threats and attacks",
        "Encryption and authentication basics",
        "Web and network security",
        "Secure coding practices",
        "Security case studies"
      ],
      image: "courses/security.jpg"
    },

    {
      id: 9,
      courseName: "Machine Learning",
      description: "Learn the fundamentals of machine learning and how algorithms learn from data to make predictions.",
      category: "AI",
      instructor: {
        name: "Salma Fathy",
        image: "instructors/salma.jpg"
      },
      price: 220,
      duration: "35 hours",
      content: [
        "Introduction to machine learning concepts",
        "Supervised and unsupervised learning",
        "Regression and classification algorithms",
        "Model evaluation and validation",
        "Overfitting and optimization techniques",
        "Building real machine learning models"
      ],
      image: "courses/ml.jpg"
    },

    {
      id: 10,
      courseName: "Artificial Intelligence",
      description: "Explore the core concepts of artificial intelligence, including search algorithms, reasoning, and intelligent agents.",
      category: "AI",
      instructor: {
        name: "Mostafa Adel",
        image: "instructors/mostafa.jpg"
      },
      price: 230,
      duration: "32 hours",
      content: [
        "Introduction to artificial intelligence",
        "Problem solving and search techniques",
        "Knowledge representation",
        "Reasoning and inference",
        "Intelligent agents",
        "Real-world AI applications"
      ],
      image: "courses/ai.jpg"
    }
  ];
}

let tmpCourses = generateCourses();
localStorage.setItem('courses', JSON.stringify(tmpCourses))
/////  courses  /////


/////  users  /////

function handleUsers() {
  return (
    [
      {
        id: 1,
        email: "youssef@gmail.com",
        password: "youssef"
      },
      {
        id: 2,
        email: "mostafa@gmail.com",
        password: "mostafa"
      },
      {
        id: 3,
        email: "abdelrahman@gmail.com",
        password: "abdelrahman"
      }
    ]
  )
}

// let tmpUsers = handleUsers();
// localStorage.setItem('users', JSON.stringify(tmpUsers));
/////  users  /////


///// course videos /////
const courseVids = [
  {
    id: "3",
    videos: ["DP1.mp4", "DP2.mp4", "DP3.mp4", "DP4.mp4"]
  }
]
localStorage.setItem('courseVideos', JSON.stringify(courseVids));
//// course videos /////

/////  exports  /////
// export const users   = JSON.parse(localStorage.getItem('users'));
export const courses = JSON.parse(localStorage.getItem('courses'));
export { courseVids }


