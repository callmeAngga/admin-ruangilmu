import Select from "../form/Select";

const status = [
    { value: "pending", label: "Pending" },
    { value: "published", label: "Published" },
];

const kelas = [
    { value: "4", label: "Kelas 4" },
    { value: "5", label: "Kelas 5" },
    { value: "6", label: "Kelas 6" },
];

const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
};

const CourseMenu = () => {
    return (
        <div className="bg-white border dark:border-gray-800 border-gray-300 dark:bg-gray-800 rounded-lg p-4">
            <h1 className="text-[18px] font-medium mb-4 text-gray-800 dark:text-gray-300 pl-1">Menu Course:</h1>

            <div className=" rounded-lg mb-4 w-full">
                <form>
                    <div className="relative">
                        <button className="absolute -translate-y-1/2 left-4 top-1/2">
                            <svg
                                className="fill-gray-500 dark:fill-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Masukan nama course"
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-12 pr-5 text-sm text-black shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-1 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900  dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                </form>
            </div>

            <div className="flex gap-4">
                <div className="rounded-lg flex-1">
                    <Select
                        options={status}
                        placeholder="Status Course"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>
                <div className="rounded-lg flex-1 ">
                    <Select
                        options={kelas}
                        placeholder="Status Course"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseMenu;