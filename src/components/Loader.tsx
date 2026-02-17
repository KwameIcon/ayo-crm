// Page Loading Spinner component


export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen crm-bg-border">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-color"></div>
        </div>
    );
}