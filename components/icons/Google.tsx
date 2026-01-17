const Google = ({ ...props }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.58V20.36H19.27C21.36 18.44 22.56 15.61 22.56 12.25Z"
                fill="#4285F4"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23C14.97 23 17.46 22.01 19.27 20.36L15.72 17.58C14.74 18.24 13.48 18.64 12 18.64C9.13 18.64 6.71 16.71 5.85 14.11H2.18V16.95C3.99 20.55 7.7 23 12 23Z"
                fill="#34A853"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.85 14.11C5.62 13.44 5.5 12.73 5.5 12C5.5 11.27 5.62 10.56 5.85 9.89V7.05H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.95L5.85 14.11Z"
                fill="#FBBC05"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.35 3.88C17.45 2.11 14.96 1 12 1C7.7 1 3.99 3.45 2.18 7.05L5.85 9.89C6.71 7.29 9.13 5.38 12 5.38Z"
                fill="#EA4335"
            />
        </svg>
    );
};

export default Google;
