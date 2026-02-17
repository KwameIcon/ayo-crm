import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../ui/button";



export default function CrmButton({ className, children, ...props }: ButtonProps) {
    return (
        <Button className={cn('crm-primary-bg hover:bg-accent-deep', className)} {...props}>
            {children}
        </Button>
    );
}