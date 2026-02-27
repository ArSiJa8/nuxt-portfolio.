<template>
  <canvas ref="canvas" class="liquid-bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvas = ref(null);
let gl, program, animationId;

const vsSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fsSource = `
  precision mediump float;
  uniform vec3 iResolution;
  uniform float iTime;
  uniform sampler2D iChannel0;

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    // Bereich für den Header (Oben zentriert)
    // Wir erstellen eine Maske, die genau dort verzerrt, wo dein Header sitzt
    vec2 headerPos = vec2(uv.x - 0.5, uv.y - 0.93);
    float aspect = iResolution.x / iResolution.y;
    headerPos.x *= aspect;

    // "Liquid Box" Mathematik für die Lichtbrechung
    float dist = pow(abs(headerPos.x * 1.4), 6.0) + pow(abs(headerPos.y * 12.0), 6.0);
    float mask = smoothstep(0.15, 0.0, dist);

    if (mask > 0.0) {
      // Physikalische Brechung (Refraction)
      vec2 distortion = headerPos * mask * 0.1;
      vec4 col = texture2D(iChannel0, uv - distortion);

      // Subtile Aufhellung des Glases
      col.rgb += mask * 0.05;
      gl_FragColor = col;
    } else {
      gl_FragColor = texture2D(iChannel0, uv);
    }
  }
`;

onMounted(() => {
  const c = canvas.value;
  gl = c.getContext('webgl');
  if (!gl) return;

  const createShader = (type, source) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return s;
  };

  program = gl.createProgram();
  gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
  gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(program);
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const pos = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = "~/assets/imgs/wallpaper.jpg"; // Pfad zu deinem Wallpaper

  img.onload = () => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const render = (time) => {
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform3f(gl.getUniformLocation(program, "iResolution"), c.width, c.height, 1.0);
      gl.uniform1f(gl.getUniformLocation(program, "iTime"), time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };
    animationId = requestAnimationFrame(render);
  };

  const handleResize = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.liquid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>