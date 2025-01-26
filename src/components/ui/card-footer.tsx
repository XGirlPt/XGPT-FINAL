export const CardFoter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
    children, 
    className, 
    ...props 
  }) => {
    return (
      <div 
        className={`p-4 mt-auto border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 flex items-center justify-between space-x-4 ${className}`} 
        {...props}
      >
        {children}
      </div>
    )
  }
  