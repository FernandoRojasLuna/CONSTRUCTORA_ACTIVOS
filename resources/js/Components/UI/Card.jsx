export default function Card({ children, className = '', padding = true, ...props }) {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 ${
                padding ? 'p-6' : ''
            } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

Card.Header = function CardHeader({ children, className = '', actions, ...props }) {
    return (
        <div
            className={`flex items-center justify-between border-b border-gray-100 pb-4 mb-4 ${className}`}
            {...props}
        >
            <div>{children}</div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
};

Card.Title = function CardTitle({ children, className = '', ...props }) {
    return (
        <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
            {children}
        </h3>
    );
};

Card.Description = function CardDescription({ children, className = '', ...props }) {
    return (
        <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
            {children}
        </p>
    );
};

Card.Body = function CardBody({ children, className = '', ...props }) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

Card.Footer = function CardFooter({ children, className = '', ...props }) {
    return (
        <div
            className={`flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-4 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
