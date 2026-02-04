import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingBooksProps {
  onClick: () => void;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}

const FloatingBooks = ({ onClick, isHovered, onHover }: FloatingBooksProps) => {
  const bookColors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];
  const booksRef = useRef<Mesh[]>([]);
  const plantRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Floating animation for books
    booksRef.current.forEach((book, i) => {
      if (book) {
        const baseY = book.userData.baseY || book.position.y;
        if (!book.userData.baseY) book.userData.baseY = baseY;
        
        book.position.y = baseY + Math.sin(time * 0.8 + i * 0.5) * 0.015;
        book.rotation.z = Math.sin(time * 0.5 + i * 0.3) * 0.02;
      }
    });

    // Gentle sway for plant
    if (plantRef.current) {
      plantRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
    }
  });

  const topBooks = [
    { x: -0.25, height: 0.2 },
    { x: -0.15, height: 0.18 },
    { x: -0.05, height: 0.22 },
    { x: 0.05, height: 0.19 },
    { x: 0.15, height: 0.21 },
  ];

  const midBooks = [
    { x: -0.2, height: 0.22 },
    { x: -0.05, height: 0.2 },
    { x: 0.1, height: 0.24 },
    { x: 0.22, height: 0.18 },
  ];

  const botBooks = [
    { x: -0.22, height: 0.18 },
    { x: -0.08, height: 0.2 },
    { x: 0.08, height: 0.17 },
    { x: 0.2, height: 0.19 },
  ];

  let bookIndex = 0;

  return (
    <group
      position={[-1.9, 0.8, -0.8]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {/* Shelf Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.25]} />
        <meshStandardMaterial 
          color={isHovered ? '#5c4033' : '#4a3728'}
          emissive={isHovered ? '#f59e0b' : '#000000'}
          emissiveIntensity={isHovered ? 0.2 : 0}
        />
      </mesh>

      {/* Shelves */}
      {[-0.35, 0, 0.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0.02]}>
          <boxGeometry args={[0.7, 0.03, 0.22]} />
          <meshStandardMaterial color="#3d2b1f" />
        </mesh>
      ))}

      {/* Books - Top Shelf */}
      {topBooks.map((book, i) => {
        const idx = bookIndex++;
        return (
          <mesh
            key={`top-${i}`}
            ref={(el) => { if (el) booksRef.current[idx] = el; }}
            position={[book.x, 0.47, 0.02]}
          >
            <boxGeometry args={[0.08, book.height, 0.15]} />
            <meshStandardMaterial color={bookColors[i % bookColors.length]} />
          </mesh>
        );
      })}

      {/* Books - Middle Shelf */}
      {midBooks.map((book, i) => {
        const idx = bookIndex++;
        return (
          <mesh
            key={`mid-${i}`}
            ref={(el) => { if (el) booksRef.current[idx] = el; }}
            position={[book.x, 0.13, 0.02]}
          >
            <boxGeometry args={[0.1, book.height, 0.15]} />
            <meshStandardMaterial color={bookColors[(i + 2) % bookColors.length]} />
          </mesh>
        );
      })}

      {/* Books - Bottom Shelf */}
      {botBooks.map((book, i) => {
        const idx = bookIndex++;
        return (
          <mesh
            key={`bot-${i}`}
            ref={(el) => { if (el) booksRef.current[idx] = el; }}
            position={[book.x, -0.22, 0.02]}
          >
            <boxGeometry args={[0.09, book.height, 0.15]} />
            <meshStandardMaterial color={bookColors[(i + 4) % bookColors.length]} />
          </mesh>
        );
      })}

      {/* Small plant pot */}
      <mesh position={[0.28, 0.5, 0.02]}>
        <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
        <meshStandardMaterial color="#cd853f" />
      </mesh>
      <mesh ref={plantRef} position={[0.28, 0.58, 0.02]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  );
};

export default FloatingBooks;
