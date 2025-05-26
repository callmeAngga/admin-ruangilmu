import CourseCard from "../card/CourseCard";

interface CourseData {
    id?: string;
    name: string;
    coverImage?: string;
    profileImage?: string;
    description: string;
    price: string;
    status: 'published' | 'pending';
    slug: string;
}

interface CourseListProps {
    onCourseSelect: (course: CourseData) => void;
}

const sampleCourses: CourseData[] = [
    {
        id: "1",
        name: "Advanced React Patterns",
        coverImage: "./image.png",
        profileImage: "/react-profile.jpg",
        description: "Learn advanced React patterns and best practices for building scalable applications",
        price: "299000",
        status: 'published',
        slug: "advanced-react-patterns"
    },
    {
        id: "2",
        name: "Node.js Backend Development",
        coverImage: "./image.png",
        profileImage: "/node-profile.jpg",
        description: "Master backend development with Node.js, Express, and MongoDB",
        price: "399000",
        status: 'pending',
        slug: "nodejs-backend-development"
    },
    {
        id: "3",
        name: "TypeScript Fundamentals",
        coverImage: "./image.png",
        profileImage: "/ts-profile.jpg",
        description: "Complete guide to TypeScript for modern web development",
        price: "199000",
        status: 'pending',
        slug: "typescript-fundamentals"
    },
    {
        id: "4",
        name: "Full Stack Web Development",
        coverImage: "./image.png",
        profileImage: "/fullstack-profile.jpg",
        description: "End-to-end web development with React, Node.js, and databases",
        price: "599000",
        status: 'published',
        slug: "full-stack-web-development"
    },
    {
        id: "5",
        name: "Python for Data Science",
        coverImage: "./image.png",
        profileImage: "/python-profile.jpg",
        description: "Learn Python programming for data analysis and machine learning",
        price: "449000",
        status: 'published',
        slug: "python-for-data-science"
    },
    {
        id: "6",
        name: "Mobile App Development",
        coverImage: "./image.png",
        profileImage: "./image.png",
        description: "Build cross-platform mobile apps with React Native",
        price: "349000",
        status: 'pending',
        slug: "mobile-app-development"
    }
];

const CourseList = ({ onCourseSelect }: CourseListProps) => {
    return (
        <div className="flex-1 bg-white border border-gray-300 dark:border-gray-800 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
                {sampleCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onSelect={() => onCourseSelect(course)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseList;