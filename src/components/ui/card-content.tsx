export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
    children, 
    className, 
    ...props 
  }) => {
    return (
      <div 
        className={`p-4 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-t-md ${className}`} 
        {...props}
      >
        {children}
      </div>
    )
  }
  