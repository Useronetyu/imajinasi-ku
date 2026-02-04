import { useState, useMemo, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Room from './3d/Room';
import Avatar from './3d/Avatar';
import AnimatedMonitor from './3d/AnimatedMonitor';
import WorldMap from './3d/WorldMap';
import GameConsole from './3d/GameConsole';
import AnimatedWindow from './3d/AnimatedWindow';
import FloatingBooks from './3d/FloatingBooks';
import DeskLamp from './3d/DeskLamp';
import CoffeeSteam from './3d/CoffeeSteam';
import RainEffect from './3d/RainEffect';
import CameraController from './3d/CameraController';
import GlassModal from './GlassModal';
import ProjectsGrid from './ProjectsGrid';
import { User, Monitor as MonitorIcon, Gamepad2, MapPin, BookOpen, Cloud } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type InteractiveObject = 'avatar' | 'monitor' | 'worldmap' | 'console' | 'window' | 'bookshelf' | null;

interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const cameraTargets: Record<Exclude<InteractiveObject, null>, CameraTarget> = {
  avatar: { position: [1, 1.2, 1.5], lookAt: [0, 0.7, 0] },
  monitor: { position: [0, 1.5, 1], lookAt: [0, 1.1, -0.8] },
  worldmap: { position: [-0.5, 1.5, 0.5], lookAt: [-1.9, 1.2, 0] },
  console: { position: [2, 0.8, 2], lookAt: [1.2, 0.15, 1.2] },
  window: { position: [0.5, 1.5, 0.5], lookAt: [1.9, 1.3, 0] },
  bookshelf: { position: [-0.5, 1.2, 0], lookAt: [-1.9, 0.8, -0.8] },
};

// Mobile-adjusted camera targets (slightly further back)
const mobileCameraTargets: Record<Exclude<InteractiveObject, null>, CameraTarget> = {
  avatar: { position: [1.5, 1.4, 2], lookAt: [0, 0.7, 0] },
  monitor: { position: [0.5, 1.7, 1.5], lookAt: [0, 1.1, -0.8] },
  worldmap: { position: [-0.2, 1.7, 1], lookAt: [-1.9, 1.2, 0] },
  console: { position: [2.5, 1, 2.5], lookAt: [1.2, 0.15, 1.2] },
  window: { position: [1, 1.7, 1], lookAt: [1.9, 1.3, 0] },
  bookshelf: { position: [-0.2, 1.4, 0.5], lookAt: [-1.9, 0.8, -0.8] },
};

const modalContent: Record<Exclude<InteractiveObject, null>, { title: string; content: string | React.ReactNode; icon: React.ReactNode }> = {
  avatar: {
    title: 'Sosok di Balik Layar',
    content: 'Hai, selamat datang di pikiranku. Aku Ilham, seorang introvert yang berbicara lewat kode. Di dunia yang penuh kebisingan ini, aku menemukan ketenangan dalam logika dan kreativitas dalam algoritma.',
    icon: <User size={32} />,
  },
  monitor: {
    title: 'Suara Dalam Diam',
    content: 'Layar ini bukan sekadar kaca, tapi tempat aku menemukan suaraku yang paling jujur.Setiap baris kode adalah jembatan antara imajinasiku dan realitas.',
    icon: <MonitorIcon size={32} />,
  },
  worldmap: {
    title: 'Mimpi Jauh',
    content: 'Sebenarnya, aku punya satu keinginan besar: bisa berkarya jauh dari sini.Titik-titik merah ini cuma pengingat biar aku nggak gampang nyerah pas lagi capek ngoding. Pengen banget rasanya injak kaki di sana suatu hari nanti.Entah bakal kejadian atau enggak. Yang penting aku udah berani nyoba dan nggak cuma diam.',
    icon: <MapPin size={32} />,
  },
  console: {
    title: 'Hobi & Recharge',
    content: 'Gaming adalah tombol reset-ku. Tempat aku mengisi ulang energi sosial yang terkuras. Di dunia virtual, aku bisa menjadi siapa saja — tapi yang terpenting, aku bisa menjadi diri sendiri tanpa tekanan.',
    icon: <Gamepad2 size={32} />,
  },
  window: {
    title: 'Dialog Tanpa Suara',
    content: 'Ada energi berbeda saat lewat tengah malam. Gangguan memudar, menyisakan fokus yang tajam. Ini adalah waktu terbaik di mana ide-ide rumit di kepalaku akhirnya menemukan bentuknya, tanpa interupsi.',
    icon: <Cloud size={32} />,
  },
  bookshelf: {
    title: 'Proyek-Proyekku',
    content: <ProjectsGrid />,
    icon: <BookOpen size={32} />,
  },
};

interface Scene3DProps {
  isRaining: boolean;
}

const Scene3D = ({ isRaining }: Scene3DProps) => {
  const isMobile = useIsMobile();
  const [selectedObject, setSelectedObject] = useState<InteractiveObject>(null);
  const [hoveredObject, setHoveredObject] = useState<InteractiveObject>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use appropriate camera targets based on device
  const activeCameraTargets = isMobile ? mobileCameraTargets : cameraTargets;

  // Default camera position - further back on mobile
  const defaultCameraPosition: [number, number, number] = isMobile ? [7, 5, 7] : [5, 4, 5];

  const handleObjectClick = useCallback((object: InteractiveObject) => {
    if (selectedObject) return; // Prevent clicking while already zoomed
    setSelectedObject(object);
    setTimeout(() => setIsModalOpen(true), 800);
  }, [selectedObject]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedObject(null), 300);
  }, []);

  const currentTarget = selectedObject ? activeCameraTargets[selectedObject] : null;

  // Adjust lighting based on weather
  const ambientIntensity = isRaining ? 0.1 : 0.15;
  const ambientColor = isRaining ? '#4a5568' : '#6366f1';

  return (
    <>
      <Canvas
        camera={{ position: defaultCameraPosition, fov: isMobile ? 55 : 50 }}
        style={{ background: isRaining 
          ? 'linear-gradient(180deg, hsl(220 30% 6%) 0%, hsl(220 25% 10%) 50%, hsl(220 30% 8%) 100%)' 
          : 'linear-gradient(180deg, hsl(230 40% 4%) 0%, hsl(260 35% 8%) 50%, hsl(230 35% 6%) 100%)' 
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile for performance
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <CameraController
            targetPosition={currentTarget?.position ?? null}
            targetLookAt={currentTarget?.lookAt ?? null}
            isZoomedIn={!!selectedObject}
            defaultPosition={defaultCameraPosition}
          />

          {/* Lighting - adjusted for weather */}
          <ambientLight intensity={ambientIntensity} color={ambientColor} />
          <pointLight 
            position={[-0.6, 1.2, -0.5]} 
            intensity={isRaining ? 1.5 : 2} 
            color={isRaining ? '#e0d8c8' : '#fef08a'} 
            distance={5} 
            decay={2} 
          />
          <pointLight 
            position={[0, 1.2, -0.8]} 
            intensity={isRaining ? 0.3 : 0.5} 
            color="#4ade80" 
            distance={3} 
            decay={2} 
          />
          <spotLight
            position={[0, 3, 2]}
            intensity={isRaining ? 0.2 : 0.3}
            angle={0.5}
            penumbra={0.5}
            color={isRaining ? '#6b7280' : '#a855f7'}
          />

          {/* Stars in the void - hide during rain */}
          {!isRaining && (
            <Stars radius={50} depth={50} count={isMobile ? 500 : 1000} factor={3} saturation={0.5} fade speed={0.5} />
          )}

          {/* Room and Objects */}
          <Room />
          <DeskLamp />
          <CoffeeSteam />
          <Avatar
            onClick={() => handleObjectClick('avatar')}
            isHovered={hoveredObject === 'avatar'}
            onHover={(h) => setHoveredObject(h ? 'avatar' : null)}
          />
          <AnimatedMonitor
            onClick={() => handleObjectClick('monitor')}
            isHovered={hoveredObject === 'monitor'}
            onHover={(h) => setHoveredObject(h ? 'monitor' : null)}
          />
          <WorldMap
            onClick={() => handleObjectClick('worldmap')}
            isHovered={hoveredObject === 'worldmap'}
            onHover={(h) => setHoveredObject(h ? 'worldmap' : null)}
          />
          <GameConsole
            onClick={() => handleObjectClick('console')}
            isHovered={hoveredObject === 'console'}
            onHover={(h) => setHoveredObject(h ? 'console' : null)}
          />
          <AnimatedWindow
            onClick={() => handleObjectClick('window')}
            isHovered={hoveredObject === 'window'}
            onHover={(h) => setHoveredObject(h ? 'window' : null)}
            isRaining={isRaining}
          />
          <FloatingBooks
            onClick={() => handleObjectClick('bookshelf')}
            isHovered={hoveredObject === 'bookshelf'}
            onHover={(h) => setHoveredObject(h ? 'bookshelf' : null)}
          />
          
          {/* Rain effect */}
          <RainEffect isRaining={isRaining} isMobile={isMobile} />

          {/* Orbit controls - optimized for touch */}
          {!selectedObject && (
            <OrbitControls
              enablePan={false}
              enableZoom={!isMobile} // Disable zoom on mobile to prevent scroll conflicts
              minDistance={isMobile ? 5 : 3}
              maxDistance={isMobile ? 12 : 10}
              minPolarAngle={0.5}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate
              autoRotateSpeed={0.3}
              touches={{ ONE: 1, TWO: 2 }} // Enable touch rotation
              rotateSpeed={isMobile ? 0.5 : 1} // Slower rotation on mobile
            />
          )}
        </Suspense>
      </Canvas>

      {/* Modal */}
      {selectedObject && (
        <GlassModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalContent[selectedObject].title}
          content={modalContent[selectedObject].content}
          icon={modalContent[selectedObject].icon}
        />
      )}

      {/* Hint */}
      {!selectedObject && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 px-4 text-center">
          <p className="text-xs sm:text-sm font-mono text-muted-foreground/60 animate-pulse">
            {isMobile ? 'Tap objek untuk menjelajahi' : 'Klik objek untuk menjelajahi • Scroll untuk zoom'}
          </p>
        </div>
      )}
    </>
  );
};

export default Scene3D;
