import { motion } from "framer-motion";

const LoadingSpinner = ({ fullScreen = true }) => {
	const spinner = (
		<motion.div
			className='w-12 h-12 border-4 border-t-4 border-t-blue-500 border-blue-100 rounded-full'
			animate={{ rotate: 360 }}
			transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
		/>
	);

	if (!fullScreen) return spinner;

	return (
		<div className='min-h-screen bg-white flex items-center justify-center relative overflow-hidden'>
			{spinner}
		</div>
	);
};

export default LoadingSpinner;
