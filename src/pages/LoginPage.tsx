import LoginForm from "../components/LoginForm"

export default function LoginPage() {
    return (
        <div  className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
            <div className="container mx-auto">
                <LoginForm />
            </div>
        </div>
    )
}