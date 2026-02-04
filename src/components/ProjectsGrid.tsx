import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  color: string;
  image?: string;
  demoUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Ilham Tycoon',
    description: 'Game simulasi membangun kerajaan digital dengan strategi bisnis.',
    color: 'from-purple-500 to-pink-500',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Cappuccino Cloud',
    description: 'Platform berbagi resep kopi artisan dengan komunitas global.',
    color: 'from-amber-500 to-orange-500',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Dreamscape',
    description: 'Aplikasi jurnal mimpi dengan AI untuk interpretasi dan analisis.',
    color: 'from-blue-500 to-cyan-500',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'CodeNest',
    description: 'Playground kolaboratif untuk developer dengan real-time sharing.',
    color: 'from-green-500 to-teal-500',
    demoUrl: '#',
    codeUrl: '#',
  },
];

const ProjectsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-h-[50vh] overflow-y-auto px-2">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 + 0.5 }}
          className={`relative p-4 rounded-xl bg-gradient-to-br ${project.color} overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20`}
          whileHover={{ scale: 1.02 }}
        >
          {/* Placeholder image area */}
          <div className="w-full h-20 mb-3 rounded-lg bg-black/20 flex items-center justify-center">
            <span className="text-white/50 text-xs font-mono">Preview</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="font-mono font-bold text-white text-sm mb-1">
              {project.title}
            </h4>
            <p className="text-white/80 text-xs mb-3 line-clamp-2">
              {project.description}
            </p>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded bg-white/20 text-white text-xs hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} />
                  Demo
                </motion.a>
              )}
              {project.codeUrl && (
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 rounded bg-white/20 text-white text-xs hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={12} />
                  Code
                </motion.a>
              )}
            </div>
          </div>
          
          {/* Hover glow overlay */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
