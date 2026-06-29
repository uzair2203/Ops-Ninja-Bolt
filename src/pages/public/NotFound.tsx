import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[120px] font-bold leading-none gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-text-secondary mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/">
              <Button icon={<ArrowLeft className="w-4 h-4" />}>Go Home</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline" icon={<Search className="w-4 h-4" />}>
                Browse Jobs
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
