const Input = ({ icon: Icon, iconColor = "#2563eb", className = "", containerClassName = "mb-6", errorMessage, ...props }) => {
  return (
    <div className={`${containerClassName}`}>
      <div className="relative">
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <Icon className='size-5' style={{ color: iconColor }} />
        </div>
        <input
          {...props}
          className={`w-full pl-10 pr-3 py-2 rounded-lg border transition duration-200 ${
            errorMessage 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              : "border-slate-300 focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          } ${className}`}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-[7px] mt-0.5 ml-1 font-semibold leading-none">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;