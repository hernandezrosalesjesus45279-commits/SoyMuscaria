
const DURACION_FASES = { amanecer: 8, dia: 15, atardecer: 8, noche: 15 };

// 1. CONSTRUCTOR DE ÁRBOLES ESTILO MINECRAFT (Pinos de Taiga)
function buildMinecraftPine(layerId, count) {
  const layer = document.getElementById(layerId);
  for(let i=0; i<count; i++) {
    const tree = document.createElement('div');
    tree.className = 'mc-tree';
    tree.style.left = (Math.random() * 110 - 5) + '%';
    
    // Escala aumentada (de 1.1x a 2.0x su tamaño original)
    const scale = 1.1 + Math.random() * 0.9;
    tree.style.transform = `scale(${scale})`;
    
    // Estructura de pino más alto y con más niveles de hojas
    tree.innerHTML = `
      <!-- Tronco café más alto -->
      <div style="position:absolute; bottom:0; left:-12px; width:24px; height:70px; background:#3e2312;"></div>
      <!-- Capas de hojas escalonadas hacia arriba -->
      <div style="position:absolute; bottom:50px; left:-45px; width:90px; height:30px; background:#112416;"></div>
      <div style="position:absolute; bottom:80px; left:-35px; width:70px; height:30px; background:#112416;"></div>
      <div style="position:absolute; bottom:110px; left:-25px; width:50px; height:25px; background:#1b3320;"></div>
      <div style="position:absolute; bottom:135px; left:-15px; width:30px; height:25px; background:#1b3320;"></div>
      <div style="position:absolute; bottom:160px; left:-8px; width:16px; height:15px; background:#1b3320;"></div>
    `;
    layer.appendChild(tree);
  }
}

// 2. CONSTRUCTOR DE HONGOS GIGANTES (Amanita Muscaria de bloques)
function buildMinecraftMushroom(layerId, count) {
  const layer = document.getElementById(layerId);
  for(let i=0; i<count; i++) {
    const shroom = document.createElement('div');
    shroom.className = 'mc-mushroom';
    shroom.style.left = (Math.random() * 100) + '%';
    
    const scale = 0.6 + Math.random() * 0.9;
    shroom.style.transform = `scale(${scale})`;
    
    // Ensamblaje de bloques (Tallo blanco + Cúpula roja + Puntos blancos)
    shroom.innerHTML = `
      <!-- Tallo -->
      <div style="position:absolute; bottom:0; left:-15px; width:30px; height:60px; background:#e0e0e0; border-right: 4px solid #b3b3b3;"></div>
      <!-- Techo Rojo -->
      <div style="position:absolute; bottom:60px; left:-55px; width:110px; height:45px; background:#d32f2f; border-bottom: 4px solid #9a1f1f;">
        <!-- Puntos Blancos Cuadrados -->
        <div style="position:absolute; top:8px; left:12px; width:12px; height:12px; background:#fff;"></div>
        <div style="position:absolute; top:20px; left:40px; width:18px; height:18px; background:#fff;"></div>
        <div style="position:absolute; top:10px; left:75px; width:15px; height:15px; background:#fff;"></div>
      </div>
    `;
    layer.appendChild(shroom);
  }
}

// 3. ESPORAS FÚNGICAS
function spawnSpores(count) {
  const container = document.getElementById('fireflies-container');
  for (let i = 0; i < count; i++) {
    const spore = document.createElement('div');
    spore.className = 'spore';
    spore.style.left = (Math.random() * 100) + 'vw';
    spore.style.bottom = (Math.random() * 100) + 'vh';
    spore.style.animationDuration = (4 + Math.random() * 6) + 's';
    spore.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(spore);
  }
}

// 4. CICLO DE TIEMPO
const phases = ['amanecer', 'dia', 'atardecer', 'noche'];
let currentPhaseIndex = 0;

function runTimeCycle() {
  const currentPhase = phases[currentPhaseIndex];
  const durationInSeconds = DURACION_FASES[currentPhase] || 10;

  document.documentElement.style.setProperty('--phase-duration', `${durationInSeconds}s`);
  document.body.className = `fase-${currentPhase}`;
  
  document.querySelectorAll('.sky').forEach(sky => sky.classList.remove('active'));
  document.getElementById(`sky-${currentPhase}`).classList.add('active');

  currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
  setTimeout(runTimeCycle, durationInSeconds * 1000);
}

// INICIALIZAR EL MUNDO (Generación del terreno)
// Capa trasera (Más pequeña y oscura)
buildMinecraftPine('forest-back', 12);
buildMinecraftMushroom('forest-back', 8);

// Capa frontal (Más grande)
buildMinecraftPine('forest-mid', 8);
buildMinecraftMushroom('forest-mid', 6);

// Invocar partículas y arrancar
spawnSpores(60);
runTimeCycle();