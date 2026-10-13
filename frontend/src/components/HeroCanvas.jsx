import React, { useEffect, useRef } from "react";

export const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = 0;
    let height = 0;

    const setDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = Math.floor(rect.width || window.innerWidth);
      height = canvas.height = Math.floor(rect.height || 700);
    };
    setDimensions();

    const handleResize = () => {
      setDimensions();
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for reactive interaction
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle nodes for blue neural network
    const particleCount = Math.min(Math.floor(width / 24), 55);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? "rgba(37, 99, 235, " : "rgba(59, 130, 246, ",
        baseAlpha: Math.random() * 0.4 + 0.15,
      });
    }

    // 3D Isometric Cube Rotation Angles
    let angleX = 0;
    let angleY = 0;

    const render = () => {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle light radial ambient glow around cursor
      const radialGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        width * 0.4
      );
      radialGradient.addColorStop(0, "rgba(239, 246, 255, 0.7)");
      radialGradient.addColorStop(0.5, "rgba(219, 234, 254, 0.2)");
      radialGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw neural network lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw 3D Isometric Cube in enterprise blue
      const cubeCenterX = width > 1024 ? width * 0.75 : width * 0.5;
      const cubeCenterY = width > 1024 ? height * 0.5 : height * 0.65;
      const cubeSize = Math.min(width * 0.18, 150);

      angleX += 0.0035;
      angleY += 0.006;

      const vertices = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ];

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      const projected = vertices.map(([x, y, z]) => {
        let x1 = x * Math.cos(angleY) + z * Math.sin(angleY);
        let z1 = -x * Math.sin(angleY) + z * Math.cos(angleY);

        let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const fov = 3.6;
        const scale = fov / (fov + z2);
        return {
          x: cubeCenterX + x1 * cubeSize * scale,
          y: cubeCenterY + y2 * cubeSize * scale,
          z: z2,
        };
      });

      // Draw lines
      ctx.lineWidth = 1.5;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const depthAlpha = ((p1.z + p2.z) / 4 + 0.65);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(37, 99, 235, ${Math.max(0.12, Math.min(0.85, depthAlpha))})`;
        ctx.stroke();
      });

      // Vertices with blue accent
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#2563EB";
        ctx.shadowColor = "#3B82F6";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};

export default HeroCanvas;
