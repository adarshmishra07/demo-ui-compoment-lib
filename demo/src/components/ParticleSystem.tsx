import React, { useEffect, useRef, useCallback } from "react";
import p5 from "p5";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: p5.Color;
  alpha: number;
  originalAlpha: number;
  life: number;
  maxLife: number;
  targetX?: number;
  targetY?: number;
}

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5>();
  const animationFrameRef = useRef<number>();

  // Memoized mouse interaction handler
  const handleMouseInteraction = useCallback(
    (
      particles: Particle[],
      mouseX: number,
      mouseY: number,
      isMobile: boolean,
      p: p5
    ) => {
      if (mouseX <= 0 || mouseY <= 0) return;

      const maxDistance = isMobile ? 120 : 180;
      const maxForce = isMobile ? 0.015 : 0.025;

      particles.forEach((particle) => {
        const distance = p.dist(particle.x, particle.y, mouseX, mouseY);

        if (distance < maxDistance) {
          const force = p.map(distance, 0, maxDistance, maxForce, 0);
          const angle = p.atan2(mouseY - particle.y, mouseX - particle.x);
          particle.vx += p.cos(angle) * force;
          particle.vy += p.sin(angle) * force;

          // Enhance particle visibility when interacting
          particle.alpha = Math.min(particle.originalAlpha * 1.5, 120);
          particle.life = Math.min(particle.life + 2, particle.maxLife);
        } else {
          // Gradually fade back to original alpha
          particle.alpha = p.lerp(particle.alpha, particle.originalAlpha, 0.05);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let colors: p5.Color[] = [];
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      const particleCount = isMobile ? 120 : isTablet ? 180 : 250;
      let lastFrameTime = 0;
      const targetFPS = isMobile ? 30 : 60;
      const frameInterval = 1000 / targetFPS;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        if (canvasRef.current) {
          canvas.parent(canvasRef.current as any);
        }

        // Enhanced ZyFAi color palette with better alpha values
        colors = [
          p.color(79, 70, 229, 80), // ZyFAi accent (indigo)
          p.color(6, 182, 212, 70), // Cyan
          p.color(139, 92, 246, 75), // Purple
          p.color(236, 72, 153, 60), // Pink
          p.color(59, 130, 246, 65), // Blue
          p.color(16, 185, 129, 60), // Emerald
        ];

        // Initialize particles with enhanced properties
        for (let i = 0; i < particleCount; i++) {
          const baseAlpha = p.random(40, 90);
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.8, 0.8),
            vy: p.random(-0.8, 0.8),
            size: p.random(isMobile ? 1.5 : 2, isMobile ? 4 : 6),
            color: p.random(colors),
            alpha: baseAlpha,
            originalAlpha: baseAlpha,
            life: p.random(100, 200),
            maxLife: 200,
          });
        }
      };

      p.draw = () => {
        const currentTime = p.millis();
        if (currentTime - lastFrameTime < frameInterval) return;
        lastFrameTime = currentTime;

        // Enhanced background with subtle gradient
        p.background(0, 0, 0, 25);

        // Add subtle radial gradient overlay
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        const maxDistance = Math.max(p.width, p.height);

        for (let r = maxDistance; r > 0; r -= 50) {
          const alpha = p.map(r, 0, maxDistance, 8, 0);
          p.fill(79, 70, 229, alpha);
          p.noStroke();
          p.ellipse(centerX, centerY, r * 2, r * 2);
        }

        // Handle mouse interaction
        handleMouseInteraction(particles, p.mouseX, p.mouseY, isMobile, p);

        // Update and draw particles with enhanced effects
        particles.forEach((particle, index) => {
          // Update particle life
          particle.life -= 0.5;
          if (particle.life <= 0) {
            // Respawn particle
            particle.x = p.random(p.width);
            particle.y = p.random(p.height);
            particle.life = particle.maxLife;
            particle.alpha = particle.originalAlpha;
          }

          // Apply physics
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Add organic movement
          const time = p.millis() * 0.001;
          particle.vx +=
            p.noise(particle.x * 0.01, particle.y * 0.01, time) * 0.02 - 0.01;
          particle.vy +=
            p.noise(particle.x * 0.01 + 100, particle.y * 0.01 + 100, time) *
              0.02 -
            0.01;

          // Apply friction and limit velocity
          particle.vx *= 0.99;
          particle.vy *= 0.99;
          particle.vx = p.constrain(particle.vx, -2.5, 2.5);
          particle.vy = p.constrain(particle.vy, -2.5, 2.5);

          // Enhanced edge wrapping with smooth transition
          const margin = 50;
          if (particle.x < -margin) {
            particle.x = p.width + margin;
            particle.vx *= 0.8;
          }
          if (particle.x > p.width + margin) {
            particle.x = -margin;
            particle.vx *= 0.8;
          }
          if (particle.y < -margin) {
            particle.y = p.height + margin;
            particle.vy *= 0.8;
          }
          if (particle.y > p.height + margin) {
            particle.y = -margin;
            particle.vy *= 0.8;
          }

          // Enhanced particle rendering with better glow
          p.noStroke();

          // Multi-layer glow effect
          const glowLayers = isMobile ? 2 : 3;
          for (let i = glowLayers; i >= 1; i--) {
            const layerAlpha = particle.alpha / (i * 1.5);
            const layerSize = particle.size * (1 + i * 0.3);

            particle.color.setAlpha(layerAlpha);
            p.fill(particle.color);
            p.circle(particle.x, particle.y, layerSize);
          }

          // Enhanced connection lines with better performance
          if (!isMobile && index % 2 === 0) {
            // Reduce connection calculations
            const connectionRange = 100;
            let connectionsDrawn = 0;
            const maxConnections = 3;

            for (
              let j = index + 1;
              j < particles.length && connectionsDrawn < maxConnections;
              j++
            ) {
              const otherParticle = particles[j];
              const distance = p.dist(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y
              );

              if (distance < connectionRange) {
                const alpha = p.map(distance, 0, connectionRange, 25, 0);
                p.stroke(79, 70, 229, alpha);
                p.strokeWeight(0.8);
                p.line(
                  particle.x,
                  particle.y,
                  otherParticle.x,
                  otherParticle.y
                );
                connectionsDrawn++;
              }
            }
          }
        });

        // Performance monitoring
        if (p.frameRate() < targetFPS * 0.8 && particles.length > 50) {
          particles.splice(-10, 10); // Remove particles if performance drops
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // Redistribute particles on resize
        particles.forEach((particle) => {
          if (particle.x > p.width) particle.x = p.random(p.width);
          if (particle.y > p.height) particle.y = p.random(p.height);
        });
      };

      p.mouseMoved = () => {
        // Handled in draw loop for better performance
        return false;
      };
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      p5Instance.current = new p5(sketch);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [handleMouseInteraction]);

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 z-[1]"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(79, 70, 229, 0.08) 0%, rgba(0, 0, 0, 0.4) 70%)",
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleSystem;
