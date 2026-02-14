import { useMemo, useRef } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * SkyChunk Component
 * 
 * A single repeatable segment of sky with clouds.
 * Hard world-space clipping - no camera-relative fade.
 */
const CHUNK_LENGTH = 40;
const CHUNK_WIDTH = 20;
const CHUNK_HEIGHT = 12;

// === TWARDA LINIA ZANIKANIA (WORLD SPACE) ===
// Pokój About jest na Z = -25 (group position w AboutRoom.jsx)
// Wszystko z world Z > CORRIDOR_CLIP_Z jest NATYCHMIAST niewidoczne
const CORRIDOR_CLIP_Z = -8.0;

// Pozycja pokoju w world space (hardcoded, bo AboutRoom ma position=[0,0,-25])
const ROOM_Z = -25;

// Available cloud textures
const CLOUD_TEXTURES = [
    '/textures/clouds/1131c3eb-dfae-423f-924b-ff39d8ccd6dc.webp',
    '/textures/clouds/254b8ec8-d6f7-4275-956f-7bab65b2ce2d.webp',
    '/textures/clouds/2cc88dd1-483c-466d-b07e-f8308c61ccbe.webp',
    '/textures/clouds/5606fcc0-3252-447d-a58a-7bcbac73229a.webp',
    '/textures/clouds/7882dc72-3d01-41fb-ac0e-d07b0184ebc1.webp',
    '/textures/clouds/9b2ca72f-7bd0-473b-ba6e-dd9e0eb79d35.webp',
    '/textures/clouds/c83293c6-d90c-4a32-8d9d-5ac9af7e2296.webp',
    '/textures/clouds/f6e358bc-d27c-41dd-95f4-6787a835c41e.webp',
];

const SkyChunk = ({ chunkIndex = 0, seed = 0, scrollProgress = 0 }) => {
    const zOffset = -(chunkIndex * CHUNK_LENGTH) - 15;

    const clouds = useMemo(() => {
        const items = [];
        const random = seededRandom(seed + chunkIndex * 1000);
        const cloudCount = 6 + Math.floor(random() * 4);

        for (let i = 0; i < cloudCount; i++) {
            const x = (random() - 0.5) * CHUNK_WIDTH;
            const y = (random() - 0.5) * CHUNK_HEIGHT;
            const z = zOffset - (random() * CHUNK_LENGTH);

            items.push({
                id: `${chunkIndex}-${i}`,
                position: [x, y, z],
                scale: 0.8 + random() * 1.5,
                baseOpacity: 0.5 + random() * 0.4,
                textureIndex: Math.floor(random() * CLOUD_TEXTURES.length),
                // Animation properties - unique per cloud
                driftSpeed: 0.3 + random() * 0.4,  // How fast it sways
                driftAmount: 0.5 + random() * 1.0, // How far it sways (X)
                bobAmount: 0.1 + random() * 0.2,   // Vertical bob amount
                timeOffset: random() * Math.PI * 2, // Phase offset so clouds don't sync
            });
        }

        return items;
    }, [chunkIndex, seed, zOffset]);

    return (
        <group>
            {clouds.map((cloud) => (
                <Cloud
                    key={cloud.id}
                    position={cloud.position}
                    scale={cloud.scale}
                    baseOpacity={cloud.baseOpacity}
                    textureIndex={cloud.textureIndex}
                    driftSpeed={cloud.driftSpeed}
                    driftAmount={cloud.driftAmount}
                    bobAmount={cloud.bobAmount}
                    timeOffset={cloud.timeOffset}
                    scrollProgress={scrollProgress}
                />
            ))}
        </group>
    );
};

// Cloud with hard world-space clipping + drift animation
const Cloud = ({
    position,
    scale,
    baseOpacity,
    textureIndex,
    driftSpeed = 0.5,
    driftAmount = 0.8,
    bobAmount = 0.15,
    timeOffset = 0,
    scrollProgress = 0
}) => {
    const meshRef = useRef();
    const materialRef = useRef();
    const { camera } = useThree();

    // Store base position for animation
    const basePosition = useRef(position);

    // Load the specific cloud texture
    const texture = useLoader(THREE.TextureLoader, CLOUD_TEXTURES[textureIndex]);

    // Calculate aspect ratio from texture dimensions
    const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
    const width = 3 * scale;
    const height = width / aspectRatio;

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;

        // === DRIFT ANIMATION ===
        const driftX = Math.sin(time * driftSpeed + timeOffset) * driftAmount;
        const driftY = Math.sin(time * driftSpeed * 0.7 + timeOffset + 1.5) * bobAmount;

        // Apply drift to position
        meshRef.current.position.x = basePosition.current[0] + driftX;
        meshRef.current.position.y = basePosition.current[1] + driftY;
        meshRef.current.position.z = basePosition.current[2];

        // === TWARDA LINIA CLIP (RĘCZNE OBLICZENIE WORLD Z) ===
        // worldZ = pokój(-25) + scrollProgress + lokalna pozycja chmury
        // NIE używamy getWorldPosition() bo useFrame dzieci odpala się PRZED rodzicem!
        const cloudLocalZ = basePosition.current[2];
        const worldZ = ROOM_Z + scrollProgress + cloudLocalZ;

        // Jeśli chmura jest za linią clipu → natychmiast niewidoczna
        if (materialRef.current) {
            materialRef.current.opacity = worldZ > CORRIDOR_CLIP_Z ? 0 : baseOpacity;
        }

        // Billboard effect - always face camera, turned 90° left
        const offsetRotation = new THREE.Euler(0, -Math.PI / 3, 0);
        const offsetQuaternion = new THREE.Quaternion().setFromEuler(offsetRotation);
        meshRef.current.quaternion.copy(camera.quaternion).multiply(offsetQuaternion);
    });

    return (
        <mesh ref={meshRef} position={position}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                ref={materialRef}
                map={texture}
                transparent
                opacity={baseOpacity}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

function seededRandom(seed) {
    let s = seed;
    return function () {
        s = Math.sin(s * 9999) * 10000;
        return s - Math.floor(s);
    };
}

export { CHUNK_LENGTH, CORRIDOR_CLIP_Z, ROOM_Z };
export default SkyChunk;
