"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;

float plasma(vec2 uv, float time) {
  float v = 0.0;
  v += sin((uv.x + time) * 7.0);
  v += sin((uv.y - time) * 9.0);
  v += sin((uv.x + uv.y + time) * 6.0);
  v += sin(length(uv - vec2(0.5)) * 20.0 - time * 2.0);
  return v / 4.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 centered = uv - 0.5;
  centered.x *= uResolution.x / uResolution.y;

  float wave = plasma(uv + uPointer * 0.12, uTime * 0.35);
  float rings = sin(length(centered + (uPointer - 0.5) * 0.3) * 42.0 - uTime * 2.0);
  float mixValue = smoothstep(-1.0, 1.0, wave + rings * 0.5);

  vec3 deepBlue = vec3(0.01, 0.15, 0.34);
  vec3 electricBlue = vec3(0.04, 0.52, 0.88);
  vec3 ember = vec3(0.93, 0.12, 0.12);

  vec3 color = mix(deepBlue, electricBlue, mixValue);
  color = mix(color, ember, smoothstep(0.65, 1.0, mixValue) * 0.18);
  color += vec3(0.1, 0.07, 0.0) * max(0.0, rings) * 0.08;

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function HypnoticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    const fitCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      canvas.width = width;
      canvas.height = height;
    };

    fitCanvas();

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (gl) {
      const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
      if (!program) return;

      const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
      const buffer = gl.createBuffer();
      if (!buffer) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.useProgram(program);
      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const uTimeLocation = gl.getUniformLocation(program, "uTime");
      const uResolutionLocation = gl.getUniformLocation(program, "uResolution");
      const uPointerLocation = gl.getUniformLocation(program, "uPointer");
      const pointer = { x: 0.5, y: 0.5 };

      const onPointerMove = (event: PointerEvent) => {
        const bounds = canvas.getBoundingClientRect();
        pointer.x = (event.clientX - bounds.left) / bounds.width;
        pointer.y = 1 - (event.clientY - bounds.top) / bounds.height;
      };

      const onResize = () => {
        fitCanvas();
        gl.viewport(0, 0, width, height);
      };

      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize);
      onResize();

      const render = (time: number) => {
        gl.viewport(0, 0, width, height);
        gl.uniform1f(uTimeLocation, time * 0.001);
        gl.uniform2f(uResolutionLocation, width, height);
        gl.uniform2f(uPointerLocation, pointer.x, pointer.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animationFrameId = window.requestAnimationFrame(render);
      };

      animationFrameId = window.requestAnimationFrame(render);

      return () => {
        window.cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
      };
    }

    const context2d = canvas.getContext("2d");
    if (!context2d) return;

    const points = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.002 + Math.random() * 0.004,
      radius: 0.4 + Math.random() * 1.9,
    }));

    const drawFallback = (time: number) => {
      fitCanvas();
      context2d.clearRect(0, 0, width, height);
      context2d.fillStyle = "rgba(4, 34, 72, .8)";
      context2d.fillRect(0, 0, width, height);

      for (const point of points) {
        point.x += Math.sin(time * 0.00015 * point.speed);
        point.y += Math.cos(time * 0.00013 * point.speed);
        if (point.x > 1) point.x = 0;
        if (point.y > 1) point.y = 0;
        const x = point.x * width;
        const y = point.y * height;
        context2d.beginPath();
        context2d.arc(x, y, point.radius * (window.devicePixelRatio || 1), 0, Math.PI * 2);
        context2d.fillStyle = "rgba(105, 160, 238, 0.35)";
        context2d.fill();
      }
      animationFrameId = window.requestAnimationFrame(drawFallback);
    };

    animationFrameId = window.requestAnimationFrame(drawFallback);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hypnotic-canvas" aria-hidden />;
}
