import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

interface CameraControllerProps {
  targetPosition: [number, number, number] | null;
  targetLookAt: [number, number, number] | null;
  isZoomedIn: boolean;
  defaultPosition?: [number, number, number];
}

const CameraController = ({ 
  targetPosition, 
  targetLookAt, 
  isZoomedIn,
  defaultPosition = [5, 4, 5]
}: CameraControllerProps) => {
  const { camera } = useThree();
  const defaultPosRef = useRef(new Vector3(...defaultPosition));
  const defaultLookAt = useRef(new Vector3(0, 0.8, 0));
  const currentLookAt = useRef(new Vector3(0, 0.8, 0));

  // Update default position if prop changes
  useEffect(() => {
    defaultPosRef.current.set(...defaultPosition);
  }, [defaultPosition]);

  useEffect(() => {
    camera.position.set(...defaultPosition);
    camera.lookAt(0, 0.8, 0);
  }, [camera, defaultPosition]);

  useFrame(() => {
    const targetPos = isZoomedIn && targetPosition 
      ? new Vector3(...targetPosition) 
      : defaultPosRef.current;
    
    const targetLook = isZoomedIn && targetLookAt 
      ? new Vector3(...targetLookAt) 
      : defaultLookAt.current;

    // Consistent smooth camera interpolation (0.8-1s transition feel)
    const lerpFactor = 0.04;
    
    camera.position.lerp(targetPos, lerpFactor);
    currentLookAt.current.lerp(targetLook, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraController;
