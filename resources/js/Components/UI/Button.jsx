import { Link } from '@inertiajs/react';
import { forwardRef } from 'react';

const Button = forwardRef(
    ({ variant = 'primary', size = 'md', href, disabled, children, className = '', ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary:
                'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-sm hover:shadow-md',
            secondary:
                'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-amber-500 shadow-sm',
            success:
                'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md',
            danger:
                'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md',
            warning:
                'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-sm hover:shadow-md',
            ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
            link: 'text-amber-600 hover:text-amber-700 underline-offset-4 hover:underline focus:ring-amber-500',
        };

        const sizes = {
            xs: 'px-2.5 py-1.5 text-xs gap-1.5',
            sm: 'px-3 py-2 text-sm gap-2',
            md: 'px-4 py-2.5 text-sm gap-2',
            lg: 'px-5 py-3 text-base gap-2.5',
            xl: 'px-6 py-3.5 text-base gap-3',
        };

        const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        if (href) {
            return (
                <Link ref={ref} href={href} className={classes} {...props}>
                    {children}
                </Link>
            );
        }

        return (
            <button ref={ref} disabled={disabled} className={classes} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
