const Input = ({ icon: Icon, iconColor = "#2563eb", className = "", ...props }) => {
  return (
    <div className='relative mb-6'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <Icon className='size-5' style={{ color: iconColor }} />
      </div>
      <input
        {...props}
        className={`w-full pl-10 pr-3 py-2 rounded-lg border focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb] transition duration-200 ${className || "bg-gray-800 bg-opacity-50 border-gray-700 text-white placeholder-gray-400"}`}
      />
    </div>
  );
};

export default Input;